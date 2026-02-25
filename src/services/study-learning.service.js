import { api } from './http'

export function fetchMyStudyEnrollments () {
  return api.get('/api/study/my/enrollments')
}

export function createMyStudyEnrollment (payload) {
  return api.post('/api/study/my/enrollments', payload)
}

export function fetchMyStudyEnrollment (enrollmentId) {
  return api.get(`/api/study/my/enrollments/${Number(enrollmentId)}`)
}

export function payMyStudyEnrollment (enrollmentId, payload = {}) {
  return api.post(`/api/study/my/enrollments/${Number(enrollmentId)}/pay`, payload)
}

export function updateMyLessonProgress (enrollmentId, lessonId, payload = {}) {
  return api.patch(
    `/api/study/my/enrollments/${Number(enrollmentId)}/lessons/${Number(lessonId)}/progress`,
    payload
  )
}

export function fetchMyEnrollmentExams (enrollmentId) {
  return api.get(`/api/study/my/enrollments/${Number(enrollmentId)}/exams`)
}

export function fetchMyEnrollmentExamDetail (enrollmentId, examId) {
  return api.get(`/api/study/my/enrollments/${Number(enrollmentId)}/exams/${Number(examId)}`)
}

export function submitMyEnrollmentExam (enrollmentId, examId, payload = {}) {
  return api.post(
    `/api/study/my/enrollments/${Number(enrollmentId)}/exams/${Number(examId)}/submit`,
    payload
  )
}

export function fetchMyEnrollmentCertificatePdf (enrollmentId) {
  return api.get(`/api/study/my/enrollments/${Number(enrollmentId)}/certificate/pdf`, {
    responseType: 'blob'
  })
}

export function fetchManagerStudyEnrollments (params = {}) {
  return api.get('/api/study/manager/enrollments', { params })
}

export function fetchManagerStudyEnrollment (enrollmentId) {
  return api.get(`/api/study/manager/enrollments/${Number(enrollmentId)}`)
}

export function assignManagerStudyEnrollmentCurator (enrollmentId, payload = {}) {
  return api.post(`/api/study/manager/enrollments/${Number(enrollmentId)}/assign-curator`, payload)
}

export function unlockManagerStudyLesson (enrollmentId, lessonId, payload = {}) {
  return api.post(
    `/api/study/manager/enrollments/${Number(enrollmentId)}/lessons/${Number(lessonId)}/unlock`,
    payload
  )
}

export function unlockManagerStudyFinalExam (enrollmentId) {
  return api.post(`/api/study/manager/enrollments/${Number(enrollmentId)}/final-exam/unlock`)
}

export function decideManagerStudyCertificate (enrollmentId, payload = {}) {
  return api.post(`/api/study/manager/enrollments/${Number(enrollmentId)}/certificate`, payload)
}

export function fetchManagerEnrollmentCertificateTemplate (enrollmentId) {
  return api.get(`/api/study/manager/enrollments/${Number(enrollmentId)}/certificate/template`, {
    responseType: 'blob'
  })
}
