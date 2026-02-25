import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse as parseSfc } from '@vue/compiler-sfc'
import { parse as parseJs } from '@babel/parser'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PANEL_COMPONENTS_DIR = path.resolve(__dirname, '../../../src/components/Panel')

function walkAst (node, visitor) {
  if (!node || typeof node !== 'object') {
    return
  }
  visitor(node)
  for (const key of Object.keys(node)) {
    const value = node[key]
    if (Array.isArray(value)) {
      value.forEach((item) => walkAst(item, visitor))
      continue
    }
    if (value && typeof value === 'object' && typeof value.type === 'string') {
      walkAst(value, visitor)
    }
  }
}

function collectVueFiles (dir) {
  const result = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      result.push(...collectVueFiles(fullPath))
      continue
    }
    if (entry.isFile() && entry.name.endsWith('.vue')) {
      result.push(fullPath)
    }
  }
  return result
}

function getPropertyName (property) {
  if (!property || !property.key) {
    return null
  }
  if (property.key.type === 'Identifier') {
    return property.key.name
  }
  if (property.key.type === 'StringLiteral') {
    return property.key.value
  }
  return null
}

function getOptionsObject (exportDeclaration) {
  if (!exportDeclaration) {
    return null
  }
  if (exportDeclaration.type === 'ObjectExpression') {
    return exportDeclaration
  }
  if (exportDeclaration.type === 'CallExpression') {
    const firstArg = exportDeclaration.arguments && exportDeclaration.arguments[0]
    if (firstArg && firstArg.type === 'ObjectExpression') {
      return firstArg
    }
  }
  return null
}

function extractThisCallName (callee) {
  if (!callee) {
    return null
  }
  if (callee.type === 'ChainExpression') {
    return extractThisCallName(callee.expression)
  }
  const isMember = callee.type === 'MemberExpression' || callee.type === 'OptionalMemberExpression'
  if (!isMember || callee.computed) {
    return null
  }
  if (callee.object && callee.object.type === 'ThisExpression' && callee.property && callee.property.type === 'Identifier') {
    return callee.property.name
  }
  return null
}

function collectMethodNames (optionsObject) {
  const methodNames = new Set()
  let hasDynamicMethods = false

  for (const property of optionsObject.properties || []) {
    if (property.type !== 'ObjectProperty') {
      continue
    }
    if (getPropertyName(property) !== 'methods') {
      continue
    }
    if (!property.value || property.value.type !== 'ObjectExpression') {
      continue
    }
    for (const methodProperty of property.value.properties || []) {
      if (methodProperty.type === 'SpreadElement') {
        hasDynamicMethods = true
        continue
      }
      if (methodProperty.type === 'ObjectMethod') {
        const name = getPropertyName(methodProperty)
        if (name) {
          methodNames.add(name)
        }
        continue
      }
      if (methodProperty.type === 'ObjectProperty') {
        const isFunctionValue =
          methodProperty.value &&
          (methodProperty.value.type === 'FunctionExpression' || methodProperty.value.type === 'ArrowFunctionExpression')
        if (!isFunctionValue) {
          continue
        }
        const name = getPropertyName(methodProperty)
        if (name) {
          methodNames.add(name)
        }
      }
    }
  }

  return { hasDynamicMethods, methodNames }
}

function collectThisMethodCalls (ast) {
  const calls = new Set()
  walkAst(ast, (node) => {
    if (node.type !== 'CallExpression' && node.type !== 'OptionalCallExpression') {
      return
    }
    const name = extractThisCallName(node.callee)
    if (!name || name.startsWith('$')) {
      return
    }
    calls.add(name)
  })
  return calls
}

function buildUndefinedCallIssues (absoluteFilePath) {
  const source = fs.readFileSync(absoluteFilePath, 'utf8')
  const { descriptor } = parseSfc(source, { filename: absoluteFilePath })
  if (!descriptor.script) {
    return []
  }

  const ast = parseJs(descriptor.script.content, {
    sourceType: 'module',
    plugins: [
      'jsx',
      'classProperties',
      'objectRestSpread',
      'optionalChaining',
      'nullishCoalescingOperator',
      'dynamicImport'
    ]
  })

  const exportNode = (ast.program.body || []).find((node) => node.type === 'ExportDefaultDeclaration')
  if (!exportNode) {
    return []
  }

  const optionsObject = getOptionsObject(exportNode.declaration)
  if (!optionsObject) {
    return []
  }

  const { methodNames, hasDynamicMethods } = collectMethodNames(optionsObject)
  if (hasDynamicMethods) {
    return []
  }

  const thisCalls = collectThisMethodCalls(ast)
  const undefinedCalls = Array.from(thisCalls).filter((name) => !methodNames.has(name)).sort()
  return undefinedCalls.map((name) => ({
    file: absoluteFilePath,
    method: name
  }))
}

describe('manager panel method-call guard', () => {
  it('uses only existing instance methods for this.<method>() calls', () => {
    const componentFiles = collectVueFiles(PANEL_COMPONENTS_DIR)
    const issues = componentFiles.flatMap(buildUndefinedCallIssues)

    if (issues.length > 0) {
      const lines = issues.map((issue) => `${path.relative(PANEL_COMPONENTS_DIR, issue.file)}: this.${issue.method}()`)
      throw new Error(`Undefined this.<method>() calls found:\n${lines.join('\n')}`)
    }
  })
})

