import { publicApi } from './http'

/**
 * @typedef {import('../types/openapi').operations['api_study_courses_list']['responses'][200]['content']['application/json']} StudyCoursesResponse
 * @typedef {import('../types/openapi').operations['api_study_course_retrieve']['responses'][200]['content']['application/json']} StudyCourseResponse
 */

/** @returns {Promise<import('axios').AxiosResponse<StudyCoursesResponse>>} */
export function fetchStudyCourses() {
  return publicApi.get('/api/study/courses')
}

/**
 * @param {number|string} courseId
 * @returns {Promise<import('axios').AxiosResponse<StudyCourseResponse>>}
 */
export function fetchStudyCourse(courseId) {
  return publicApi.get(`/api/study/course/${Number(courseId)}`)
}
