import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const files = {
  coursesList: path.resolve(__dirname, '../../../src/components/Study/CourcesList.vue'),
  aboutCourse: path.resolve(__dirname, '../../../src/components/Study/AboutCourse.vue'),
  courseWelcome: path.resolve(__dirname, '../../../src/components/Study/CourseWelcome.vue'),
  courseRelated: path.resolve(__dirname, '../../../src/components/Study/CourseRelated.vue'),
  courseProgramm: path.resolve(__dirname, '../../../src/components/Study/CourseProgramm.vue'),
  panelStudyUser: path.resolve(__dirname, '../../../src/components/Panel/PanelStudyUser.vue')
}

describe('study rich text rendering', () => {
  it('renders study descriptions as sanitized html instead of raw tag text', () => {
    const coursesList = fs.readFileSync(files.coursesList, 'utf8')
    const aboutCourse = fs.readFileSync(files.aboutCourse, 'utf8')
    const courseWelcome = fs.readFileSync(files.courseWelcome, 'utf8')
    const courseRelated = fs.readFileSync(files.courseRelated, 'utf8')
    const courseProgramm = fs.readFileSync(files.courseProgramm, 'utf8')
    const panelStudyUser = fs.readFileSync(files.panelStudyUser, 'utf8')

    expect(coursesList).toContain('v-html="renderRichText(course.description)"')
    expect(aboutCourse).toContain('v-html="renderRichText(course.description)"')
    expect(courseWelcome).toContain('v-html="renderRichText(course.description)"')
    expect(courseRelated).toContain('v-html="renderRichText(course.description)"')
    expect(courseProgramm).toContain('v-html="renderRichText(lesson.description)"')
    expect(panelStudyUser).toContain('v-html="renderRichText(courseDescription(currentOrder))"')
    expect(panelStudyUser).toContain('v-html="renderRichText(priceDescription(currentOrder))"')
    expect(panelStudyUser).toContain('v-html="renderRichText(currentLesson.lesson_description)"')
    expect(panelStudyUser).toContain('v-html="renderRichText(currentLesson.lesson_text_content)"')
  })
})
