import { api } from '@/services/http'

export const study = {
  namespaced: true,
  state: {
    courses: [],
    course: [],
  },
  mutations: {
    setCoursesData(state, coursesData) {
      state.courses = coursesData.map(course => {
        return {
          id: course.id,
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
    setCourseData(state, courseData) {
      state.course = courseData
    },
  },
  actions: {
    fetchCourses({ commit }) {
      return api
        .get('/api/study/courses')
        .then(response => {
          commit('setCoursesData', response.data)
        })
    },
    fetchCourse({ commit }, id) {
      return api
        .get('/api/study/course/' + Number(id))
        .then(response => {
          commit('setCourseData', response.data)
        })
    },
  },
}
