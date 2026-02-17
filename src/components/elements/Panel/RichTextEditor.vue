<template>
  <div
    class="panel-rich-text"
    :class="{
      'panel-rich-text--focused': isFocused,
      'panel-rich-text--readonly': !editable,
    }"
  >
    <div class="panel-rich-text__toolbar">
      <button
        type="button"
        :class="toolbarButtonClass(isParagraphActive)"
        :disabled="!editor || !editable"
        title="Обычный текст"
        @mousedown.prevent
        @click="setParagraph"
      >
        P
      </button>
      <button
        type="button"
        :class="toolbarButtonClass(isHeadingLevelActive(2))"
        :disabled="!editor || !editable"
        title="Заголовок H2"
        @mousedown.prevent
        @click="toggleHeading(2)"
      >
        H2
      </button>
      <button
        type="button"
        :class="toolbarButtonClass(isHeadingLevelActive(3))"
        :disabled="!editor || !editable"
        title="Заголовок H3"
        @mousedown.prevent
        @click="toggleHeading(3)"
      >
        H3
      </button>
      <span class="panel-rich-text__divider"></span>
      <button
        type="button"
        :class="toolbarButtonClass(isBoldActive)"
        :disabled="!editor || !editable"
        title="Жирный"
        @mousedown.prevent
        @click="toggleBold"
      >
        B
      </button>
      <button
        type="button"
        :class="toolbarButtonClass(isItalicActive)"
        :disabled="!editor || !editable"
        title="Курсив"
        @mousedown.prevent
        @click="toggleItalic"
      >
        I
      </button>
      <button
        type="button"
        :class="toolbarButtonClass(isUnderlineActive)"
        :disabled="!editor || !editable"
        title="Подчеркивание"
        @mousedown.prevent
        @click="toggleUnderline"
      >
        U
      </button>
      <button
        type="button"
        :class="toolbarButtonClass(isStrikeActive)"
        :disabled="!editor || !editable"
        title="Зачеркнутый"
        @mousedown.prevent
        @click="toggleStrike"
      >
        S
      </button>
      <span class="panel-rich-text__divider"></span>
      <button
        type="button"
        :class="toolbarButtonClass(isBulletListActive)"
        :disabled="!editor || !editable"
        title="Маркированный список"
        @mousedown.prevent
        @click="toggleBulletList"
      >
        List
      </button>
      <button
        type="button"
        :class="toolbarButtonClass(isOrderedListActive)"
        :disabled="!editor || !editable"
        title="Нумерованный список"
        @mousedown.prevent
        @click="toggleOrderedList"
      >
        Num
      </button>
      <button
        type="button"
        :class="toolbarButtonClass(isBlockquoteActive)"
        :disabled="!editor || !editable"
        title="Цитата"
        @mousedown.prevent
        @click="toggleBlockquote"
      >
        Quote
      </button>
      <span class="panel-rich-text__divider"></span>
      <button
        type="button"
        :class="toolbarButtonClass(isLinkActive)"
        :disabled="!editor || !editable"
        title="Добавить или изменить ссылку"
        @mousedown.prevent
        @click="setLink"
      >
        URL
      </button>
      <button
        type="button"
        class="panel-rich-text__btn panel-rich-text__btn--ghost"
        :disabled="!editor || !editable || !isLinkActive"
        title="Удалить ссылку"
        @mousedown.prevent
        @click="unsetLink"
      >
        No URL
      </button>
      <span class="panel-rich-text__divider"></span>
      <button
        type="button"
        :class="toolbarButtonClass(isTableActive)"
        :disabled="!editor || !editable"
        title="Вставить таблицу 3x3"
        @mousedown.prevent
        @click="insertTable"
      >
        Table
      </button>
      <button
        type="button"
        class="panel-rich-text__btn panel-rich-text__btn--ghost"
        :disabled="!editor || !editable || !isTableActive"
        title="Добавить строку"
        @mousedown.prevent
        @click="addRowAfter"
      >
        +Row
      </button>
      <button
        type="button"
        class="panel-rich-text__btn panel-rich-text__btn--ghost"
        :disabled="!editor || !editable || !isTableActive"
        title="Добавить колонку"
        @mousedown.prevent
        @click="addColumnAfter"
      >
        +Col
      </button>
      <button
        type="button"
        class="panel-rich-text__btn panel-rich-text__btn--ghost"
        :disabled="!editor || !editable || !isTableActive"
        title="Переключить строку заголовков"
        @mousedown.prevent
        @click="toggleHeaderRow"
      >
        Head
      </button>
      <button
        type="button"
        class="panel-rich-text__btn panel-rich-text__btn--ghost"
        :disabled="!editor || !editable || !isTableActive"
        title="Удалить строку"
        @mousedown.prevent
        @click="deleteRow"
      >
        -Row
      </button>
      <button
        type="button"
        class="panel-rich-text__btn panel-rich-text__btn--ghost"
        :disabled="!editor || !editable || !isTableActive"
        title="Удалить колонку"
        @mousedown.prevent
        @click="deleteColumn"
      >
        -Col
      </button>
      <button
        type="button"
        class="panel-rich-text__btn panel-rich-text__btn--ghost"
        :disabled="!editor || !editable || !isTableActive"
        title="Удалить таблицу"
        @mousedown.prevent
        @click="deleteTable"
      >
        Drop
      </button>
      <button
        type="button"
        class="panel-rich-text__btn panel-rich-text__btn--ghost"
        :disabled="!editor || !editable"
        title="Очистить форматирование"
        @mousedown.prevent
        @click="clearFormatting"
      >
        Clean
      </button>
    </div>
    <editor-content v-if="editor" :editor="editor" class="panel-rich-text__editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import { Table } from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'

export default {
  name: 'RichTextEditor',
  components: { EditorContent },
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Введите текст'
    },
    minHeight: {
      type: Number,
      default: 220
    },
    editable: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue', 'blur'],
  data () {
    return {
      editor: null,
      isFocused: false
    }
  },
  computed: {
    isParagraphActive () {
      return Boolean(this.editor && this.editor.isActive('paragraph'))
    },
    isBoldActive () {
      return Boolean(this.editor && this.editor.isActive('bold'))
    },
    isItalicActive () {
      return Boolean(this.editor && this.editor.isActive('italic'))
    },
    isUnderlineActive () {
      return Boolean(this.editor && this.editor.isActive('underline'))
    },
    isStrikeActive () {
      return Boolean(this.editor && this.editor.isActive('strike'))
    },
    isBulletListActive () {
      return Boolean(this.editor && this.editor.isActive('bulletList'))
    },
    isOrderedListActive () {
      return Boolean(this.editor && this.editor.isActive('orderedList'))
    },
    isBlockquoteActive () {
      return Boolean(this.editor && this.editor.isActive('blockquote'))
    },
    isLinkActive () {
      return Boolean(this.editor && this.editor.isActive('link'))
    },
    isTableActive () {
      return Boolean(this.editor && this.editor.isActive('table'))
    }
  },
  watch: {
    modelValue (nextValue) {
      if (!this.editor) {
        return
      }
      const normalizedNext = this.normalizeHtml(nextValue)
      const normalizedCurrent = this.normalizeHtml(this.editor.getHTML())
      if (normalizedNext === normalizedCurrent) {
        return
      }
      this.editor.commands.setContent(nextValue || '', false)
    },
    editable (isEditable) {
      if (!this.editor) {
        return
      }
      this.editor.setEditable(Boolean(isEditable))
    }
  },
  mounted () {
    this.initEditor()
  },
  beforeUnmount () {
    this.destroyEditor()
  },
  methods: {
    initEditor () {
      if (this.editor) {
        return
      }
      this.editor = new Editor({
        content: this.modelValue || '',
        editable: this.editable,
        extensions: [
          StarterKit.configure({
            heading: {
              levels: [2, 3]
            }
          }),
          Underline,
          Link.configure({
            openOnClick: false,
            autolink: true,
            linkOnPaste: true,
            HTMLAttributes: {
              rel: 'noopener noreferrer nofollow',
              target: '_blank'
            }
          }),
          Placeholder.configure({
            placeholder: this.placeholder
          }),
          Image.configure({
            allowBase64: true,
            inline: false
          }),
          Table.configure({
            resizable: true,
            HTMLAttributes: {
              class: 'panel-rich-text__table'
            }
          }),
          TableRow,
          TableHeader,
          TableCell
        ],
        editorProps: {
          attributes: {
            class: 'panel-rich-text__content',
            style: `min-height: ${this.minHeight}px;`
          }
        },
        onFocus: () => {
          this.isFocused = true
        },
        onBlur: () => {
          this.isFocused = false
          this.$emit('blur')
        },
        onUpdate: ({ editor }) => {
          this.$emit('update:modelValue', editor.getHTML())
        }
      })
    },
    destroyEditor () {
      if (!this.editor) {
        return
      }
      this.editor.destroy()
      this.editor = null
    },
    normalizeHtml (value) {
      const raw = String(value || '').trim()
      if (!raw || raw === '<p></p>') {
        return ''
      }
      return raw
    },
    toolbarButtonClass (isActive) {
      return {
        'panel-rich-text__btn': true,
        'panel-rich-text__btn--active': Boolean(isActive)
      }
    },
    headingIsActive (level) {
      if (!this.editor) {
        return false
      }
      return this.editor.isActive('heading', { level })
    },
    isHeadingLevelActive (level) {
      return this.headingIsActive(level)
    },
    setParagraph () {
      if (!this.editor) {
        return
      }
      this.editor.chain().focus().setParagraph().run()
    },
    toggleHeading (level) {
      if (!this.editor) {
        return
      }
      this.editor.chain().focus().toggleHeading({ level }).run()
    },
    toggleBold () {
      if (!this.editor) {
        return
      }
      this.editor.chain().focus().toggleBold().run()
    },
    toggleItalic () {
      if (!this.editor) {
        return
      }
      this.editor.chain().focus().toggleItalic().run()
    },
    toggleUnderline () {
      if (!this.editor) {
        return
      }
      this.editor.chain().focus().toggleUnderline().run()
    },
    toggleStrike () {
      if (!this.editor) {
        return
      }
      this.editor.chain().focus().toggleStrike().run()
    },
    toggleBulletList () {
      if (!this.editor) {
        return
      }
      this.editor.chain().focus().toggleBulletList().run()
    },
    toggleOrderedList () {
      if (!this.editor) {
        return
      }
      this.editor.chain().focus().toggleOrderedList().run()
    },
    toggleBlockquote () {
      if (!this.editor) {
        return
      }
      this.editor.chain().focus().toggleBlockquote().run()
    },
    setLink () {
      if (!this.editor) {
        return
      }
      const previousUrl = this.editor.getAttributes('link').href || 'https://'
      const url = window.prompt('Введите URL', previousUrl)
      if (url === null) {
        return
      }
      const normalized = String(url).trim()
      if (!normalized) {
        this.unsetLink()
        return
      }
      const withProtocol = /^(https?:\/\/|mailto:|tel:)/i.test(normalized)
        ? normalized
        : `https://${normalized}`
      this.editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: withProtocol })
        .run()
    },
    unsetLink () {
      if (!this.editor) {
        return
      }
      this.editor.chain().focus().extendMarkRange('link').unsetLink().run()
    },
    clearFormatting () {
      if (!this.editor) {
        return
      }
      this.editor.chain().focus().unsetAllMarks().clearNodes().run()
    },
    insertTable () {
      if (!this.editor) {
        return
      }
      this.editor
        .chain()
        .focus()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run()
    },
    addRowAfter () {
      if (!this.editor || !this.isTableActive) {
        return
      }
      this.editor.chain().focus().addRowAfter().run()
    },
    addColumnAfter () {
      if (!this.editor || !this.isTableActive) {
        return
      }
      this.editor.chain().focus().addColumnAfter().run()
    },
    toggleHeaderRow () {
      if (!this.editor || !this.isTableActive) {
        return
      }
      this.editor.chain().focus().toggleHeaderRow().run()
    },
    deleteRow () {
      if (!this.editor || !this.isTableActive) {
        return
      }
      this.editor.chain().focus().deleteRow().run()
    },
    deleteColumn () {
      if (!this.editor || !this.isTableActive) {
        return
      }
      this.editor.chain().focus().deleteColumn().run()
    },
    deleteTable () {
      if (!this.editor || !this.isTableActive) {
        return
      }
      this.editor.chain().focus().deleteTable().run()
    },
    insertImage (image) {
      if (!this.editor) {
        return
      }
      const src = String(image && image.src ? image.src : '').trim()
      if (!src) {
        return
      }
      const alt = String(image && image.alt ? image.alt : '').trim()
      this.editor.chain().focus().setImage({ src, alt }).run()
    },
    focus () {
      if (!this.editor) {
        return
      }
      this.editor.chain().focus().run()
    },
    getHTML () {
      if (!this.editor) {
        return ''
      }
      return this.editor.getHTML()
    }
  }
}
</script>

<style scoped>
.panel-rich-text {
  --editor-accent: #d83a56;
  --editor-border: #d0d5dd;
  --editor-border-muted: #eaecf0;
  --editor-bg: #f8fafc;
  --editor-white: #ffffff;
  --editor-text: #1d2939;
  --editor-muted: #667085;
  border: 1px solid var(--editor-border);
  border-radius: 14px;
  background: var(--editor-white);
  overflow: hidden;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.panel-rich-text--focused {
  border-color: var(--editor-accent);
  box-shadow: 0 0 0 3px rgba(216, 58, 86, 0.12);
}

.panel-rich-text--readonly {
  opacity: 0.75;
}

.panel-rich-text__toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  padding: 10px;
  background:
    linear-gradient(180deg, rgba(248, 250, 252, 0.95) 0%, rgba(241, 245, 249, 0.95) 100%);
  border-bottom: 1px solid var(--editor-border-muted);
}

.panel-rich-text__divider {
  width: 1px;
  height: 22px;
  background: var(--editor-border);
  margin: 0 2px;
}

.panel-rich-text__btn {
  border: 1px solid #d7dce3;
  background: var(--editor-white);
  color: var(--editor-text);
  min-height: 32px;
  padding: 0 10px;
  border-radius: 9px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.01em;
  transition: all 0.18s ease;
}

.panel-rich-text__btn:hover:not(:disabled) {
  background: var(--editor-bg);
  border-color: #c2c8d0;
}

.panel-rich-text__btn:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.panel-rich-text__btn--active {
  border-color: var(--editor-accent);
  background: var(--editor-accent);
  color: #ffffff;
}

.panel-rich-text__btn--ghost {
  background: #f2f4f7;
  color: #344054;
}

.panel-rich-text__editor {
  background: #fff;
}

.panel-rich-text :deep(.ProseMirror) {
  outline: none;
  padding: 14px 16px;
  color: var(--editor-text);
  line-height: 1.65;
  font-size: 15px;
}

.panel-rich-text :deep(.ProseMirror p) {
  margin: 0 0 0.9em;
}

.panel-rich-text :deep(.ProseMirror h2),
.panel-rich-text :deep(.ProseMirror h3) {
  color: #101828;
  margin: 0.2em 0 0.65em;
  font-weight: 700;
}

.panel-rich-text :deep(.ProseMirror h2) {
  font-size: 1.35em;
}

.panel-rich-text :deep(.ProseMirror h3) {
  font-size: 1.15em;
}

.panel-rich-text :deep(.ProseMirror ul),
.panel-rich-text :deep(.ProseMirror ol) {
  padding-left: 1.35em;
  margin: 0 0 0.9em;
}

.panel-rich-text :deep(.ProseMirror blockquote) {
  border-left: 3px solid rgba(216, 58, 86, 0.45);
  margin: 0 0 0.9em;
  padding: 0.2em 0 0.2em 0.9em;
  color: #475467;
  background: #fcf4f6;
  border-radius: 0 8px 8px 0;
}

.panel-rich-text :deep(.ProseMirror a) {
  color: var(--editor-accent);
  text-decoration: underline;
}

.panel-rich-text :deep(.ProseMirror img) {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  border: 1px solid #eaecf0;
}

.panel-rich-text :deep(.tableWrapper) {
  overflow-x: auto;
  margin: 0 0 0.9em;
}

.panel-rich-text :deep(.ProseMirror table) {
  width: 100%;
  min-width: 480px;
  border-collapse: collapse;
  table-layout: fixed;
}

.panel-rich-text :deep(.ProseMirror th),
.panel-rich-text :deep(.ProseMirror td) {
  border: 1px solid #d0d5dd;
  padding: 8px 10px;
  vertical-align: top;
  background: #fff;
}

.panel-rich-text :deep(.ProseMirror th) {
  font-weight: 700;
  color: #1d2939;
  background: #f2f4f7;
}

.panel-rich-text :deep(.ProseMirror .selectedCell) {
  background: #fff1f4;
}

.panel-rich-text :deep(.ProseMirror .column-resize-handle) {
  background: #d83a56;
}

.panel-rich-text :deep(.ProseMirror p.is-editor-empty:first-child::before) {
  color: var(--editor-muted);
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}

@media (max-width: 767.98px) {
  .panel-rich-text__toolbar {
    gap: 5px;
    padding: 8px;
  }

  .panel-rich-text__btn {
    min-height: 30px;
    padding: 0 8px;
    font-size: 11px;
  }
}
</style>
