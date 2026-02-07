import { api, publicApi } from '@/services/http'
import authHeader from '@/services/auth-header'

const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user'))
  } catch (err) {
    return null
  }
}

const isManagerUser = (user) => {
  if (!user) {
    return false
  }
  if (user.is_superuser === true || user.is_staff === true || user.is_manager === true || user.isManager === true) {
    return true
  }
  const groups = user.groups || user.group || user.roles || user.role || user.groups_names || user.groups_list
  if (!groups) {
    return false
  }
  const normalize = (value) => String(value || '').toLowerCase()
  const isManagerName = (value) => {
    const name = normalize(typeof value === 'string' ? value : value.name || value.title)
    return name === 'manager' || name === 'менеджер'
  }
  if (Array.isArray(groups)) {
    return groups.some(isManagerName)
  }
  return isManagerName(groups)
}

export const study = {
  namespaced: true,
  state: {
    courses: [],
    course: {
      lessons: [],
      teachers: [],
      feedbacks: [],
      prices: [],
      related: [],
    },
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
      const safe = courseData || {}
      state.course = {
        ...safe,
        lessons: Array.isArray(safe.lessons) ? safe.lessons : [],
        teachers: Array.isArray(safe.teachers) ? safe.teachers : [],
        feedbacks: Array.isArray(safe.feedbacks) ? safe.feedbacks : [],
        prices: Array.isArray(safe.prices) ? safe.prices : [],
        related: Array.isArray(safe.related) ? safe.related : [],
      }
    },
  },
  actions: {
    async fetchCourses({ commit }) {
      const response = await publicApi.get('/api/study/courses')
      commit('setCoursesData', response.data)
    },
    async fetchCourse({ commit }, id) {
      const response = await publicApi.get('/api/study/course/' + Number(id))
      commit('setCourseData', response.data)
    },
  },
}
