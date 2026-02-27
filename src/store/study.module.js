import { fetchStudyCourse, fetchStudyCourses } from '@/services/study.service'

export const study = {
  namespaced: true,
  state: {
    courses: [],
    course: {
      lessons: [],
      teachers: [],
      feedbacks: [],
      prices: [],
      related: []
    }
  },
  mutations: {
    setCoursesData (state, coursesData) {
      state.courses = coursesData.map(course => {
        return {
          id: course.id,
          slug: course.slug,
          name: course.name,
          description: course.description,
          price: course.price,
          photo: course.photo,
          duration: course.duration,
          lessons_number: course.lessons_number,
          teachers_number: course.teachers_number,
          lessons: course.lessons,
          teachers: course.teachers,
          prices: course.prices,
          related: course.related
        }
      })
    },
    setCourseData (state, courseData) {
      const safe = courseData || {}
      state.course = {
        ...safe,
        lessons: Array.isArray(safe.lessons) ? safe.lessons : [],
        teachers: Array.isArray(safe.teachers) ? safe.teachers : [],
        feedbacks: Array.isArray(safe.feedbacks) ? safe.feedbacks : [],
        prices: Array.isArray(safe.prices) ? safe.prices : [],
        related: Array.isArray(safe.related) ? safe.related : []
      }
    }
  },
  actions: {
    async fetchCourses ({ commit }) {
      const response = await fetchStudyCourses()
      commit('setCoursesData', response.data)
    },
    async fetchCourse ({ commit }, id) {
      const response = await fetchStudyCourse(id)
      commit('setCourseData', response.data)
    }
  }
}
