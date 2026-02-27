import { api, publicApi } from './http'

export function fetchUserProfile () {
  return api.get('/api/user/profile')
}

export function updateUserProfile (payload) {
  return api.patch('/api/user/profile', payload)
}

export function fetchPanelArticles () {
  return api.get('/api/articles/')
}

export function fetchPanelArticle (articleId) {
  return api.get(`/api/articles/${articleId}/`)
}

export function createPanelArticle (payload) {
  return api.post('/api/articles/', payload)
}

export function generatePanelAiArticle (payload, requestConfig = {}) {
  return api.post('/api/articles/generate-ai/', payload, requestConfig)
}

export function updatePanelArticle (articleId, payload) {
  return api.patch(`/api/articles/${articleId}/`, payload)
}

export function deletePanelArticle (articleId) {
  return api.delete(`/api/articles/${articleId}/`)
}

export function fetchPanelArticleMedia () {
  return api.get('/api/article-media/')
}

export function uploadPanelArticleMedia (payload) {
  return api.post('/api/article-media/', payload)
}

export function fetchPanelArticleCategories () {
  return api.get('/api/article-categories/')
}

export function createPanelArticleCategory (payload) {
  return api.post('/api/article-categories/', payload)
}

export function updatePanelArticleCategory (categoryId, payload) {
  return api.patch(`/api/article-categories/${categoryId}/`, payload)
}

export function deletePanelArticleCategory (categoryId) {
  return api.delete(`/api/article-categories/${categoryId}/`)
}

export function fetchPanelArticleTags () {
  return api.get('/api/article-tags/')
}

export function createPanelArticleTag (payload) {
  return api.post('/api/article-tags/', payload)
}

export function updatePanelArticleTag (tagId, payload) {
  return api.patch(`/api/article-tags/${tagId}/`, payload)
}

export function deletePanelArticleTag (tagId) {
  return api.delete(`/api/article-tags/${tagId}/`)
}

export function fetchGalleryManagerPages () {
  return api.get('/api/gallery/manager/pages/')
}

export function fetchGalleryManagerCategories () {
  return api.get('/api/gallery/manager/categories/')
}

export function createGalleryManagerCategory (payload) {
  return api.post('/api/gallery/manager/categories/', payload)
}

export function updateGalleryManagerCategory (categoryId, payload) {
  return api.patch(`/api/gallery/manager/categories/${categoryId}/`, payload)
}

export function deleteGalleryManagerCategory (categoryId) {
  return api.delete(`/api/gallery/manager/categories/${categoryId}/`)
}

export function fetchGalleryManagerItems (params = {}) {
  return api.get('/api/gallery/manager/items/', { params })
}

export function createGalleryManagerItem (payload) {
  return api.post('/api/gallery/manager/items/', payload)
}

export function updateGalleryManagerItem (itemId, payload) {
  return api.patch(`/api/gallery/manager/items/${itemId}/`, payload)
}

export function deleteGalleryManagerItem (itemId) {
  return api.delete(`/api/gallery/manager/items/${itemId}/`)
}

export function fetchCompanyManagerCategories () {
  return api.get('/api/companies/manager/categories/')
}

export function createCompanyManagerCategory (payload) {
  return api.post('/api/companies/manager/categories/', payload)
}

export function updateCompanyManagerCategory (categoryId, payload) {
  return api.patch(`/api/companies/manager/categories/${categoryId}/`, payload)
}

export function deleteCompanyManagerCategory (categoryId) {
  return api.delete(`/api/companies/manager/categories/${categoryId}/`)
}

export function fetchCompanyManagerCompanies (params = {}) {
  return api.get('/api/companies/manager/companies/', { params })
}

export function createCompanyManagerCompany (payload) {
  return api.post('/api/companies/manager/companies/', payload)
}

export function updateCompanyManagerCompany (companyId, payload) {
  return api.patch(`/api/companies/manager/companies/${companyId}/`, payload)
}

export function deleteCompanyManagerCompany (companyId) {
  return api.delete(`/api/companies/manager/companies/${companyId}/`)
}

export function fetchShopManagerCategories () {
  return api.get('/api/shop/manager/categories')
}

export function createShopManagerCategory (payload) {
  return api.post('/api/shop/manager/categories', payload)
}

export function updateShopManagerCategory (categoryId, payload) {
  return api.patch(`/api/shop/manager/categories/${categoryId}`, payload)
}

export function deleteShopManagerCategory (categoryId) {
  return api.delete(`/api/shop/manager/categories/${categoryId}`)
}

export function fetchShopManagerProducts () {
  return api.get('/api/shop/manager/products')
}

export function fetchShopManagerProduct (productId) {
  return api.get(`/api/shop/manager/products/${productId}`)
}

export function fetchShopPublicProduct (productId) {
  return publicApi.get(`/api/shop/products/${productId}`)
}

export function createShopManagerProduct (payload) {
  return api.post('/api/shop/manager/products', payload)
}

export function updateShopManagerProduct (productId, payload) {
  return api.patch(`/api/shop/manager/products/${productId}`, payload)
}

export function deleteShopManagerProduct (productId) {
  return api.delete(`/api/shop/manager/products/${productId}`)
}

export function createShopManagerProductImage (payload) {
  return api.post('/api/shop/manager/product-images', payload)
}

export function deleteShopManagerProductImage (imageId) {
  return api.delete(`/api/shop/manager/product-images/${imageId}`)
}

export function fetchShopManagerDiscounts () {
  return api.get('/api/shop/manager/discounts')
}

export function createShopManagerDiscount (payload) {
  return api.post('/api/shop/manager/discounts', payload)
}

export function updateShopManagerDiscount (discountId, payload) {
  return api.patch(`/api/shop/manager/discounts/${discountId}`, payload)
}

export function deleteShopManagerDiscount (discountId) {
  return api.delete(`/api/shop/manager/discounts/${discountId}`)
}

export function fetchShopManagerFilterAttrs () {
  return api.get('/api/shop/manager/filter-attrs')
}

export function createShopManagerFilterAttr (payload) {
  return api.post('/api/shop/manager/filter-attrs', payload)
}

export function updateShopManagerFilterAttr (attrId, payload) {
  return api.patch(`/api/shop/manager/filter-attrs/${attrId}`, payload)
}

export function deleteShopManagerFilterAttr (attrId) {
  return api.delete(`/api/shop/manager/filter-attrs/${attrId}`)
}

export function fetchShopManagerFilterAttrListValues () {
  return api.get('/api/shop/manager/filter-attr-list-values')
}

export function createShopManagerFilterAttrListValue (payload) {
  return api.post('/api/shop/manager/filter-attr-list-values', payload)
}

export function updateShopManagerFilterAttrListValue (valueId, payload) {
  return api.patch(`/api/shop/manager/filter-attr-list-values/${valueId}`, payload)
}

export function deleteShopManagerFilterAttrListValue (valueId) {
  return api.delete(`/api/shop/manager/filter-attr-list-values/${valueId}`)
}

export function fetchShopManagerFilterAttrValues () {
  return api.get('/api/shop/manager/filter-attr-values')
}

export function createShopManagerFilterAttrValue (payload) {
  return api.post('/api/shop/manager/filter-attr-values', payload)
}

export function updateShopManagerFilterAttrValue (valueId, payload) {
  return api.patch(`/api/shop/manager/filter-attr-values/${valueId}`, payload)
}

export function deleteShopManagerFilterAttrValue (valueId) {
  return api.delete(`/api/shop/manager/filter-attr-values/${valueId}`)
}

export function fetchShopOrderStatuses () {
  return api.get('/api/shop/order-statuses')
}

export function fetchShopOrders () {
  return api.get('/api/shop/orders')
}

export function fetchShopOrder (orderId) {
  return api.get(`/api/shop/orders/${orderId}`)
}

export function updateShopOrder (orderId, payload) {
  return api.patch(`/api/shop/orders/${orderId}`, payload)
}

export function fetchUserShopOrders () {
  return api.get('/api/shop/my/orders')
}

export function fetchUserShopOrder (orderId) {
  return api.get(`/api/shop/my/orders/${orderId}`)
}

export function fetchPrintManagerMaterialCategories () {
  return api.get('/api/print/manager/material-categories/')
}

export function createPrintManagerMaterialCategory (payload) {
  return api.post('/api/print/manager/material-categories/', payload)
}

export function updatePrintManagerMaterialCategory (categoryId, payload) {
  return api.patch(`/api/print/manager/material-categories/${categoryId}/`, payload)
}

export function deletePrintManagerMaterialCategory (categoryId) {
  return api.delete(`/api/print/manager/material-categories/${categoryId}/`)
}

export function fetchPrintManagerMaterials () {
  return api.get('/api/print/manager/materials/')
}

export function createPrintManagerMaterial (payload) {
  return api.post('/api/print/manager/materials/', payload)
}

export function updatePrintManagerMaterial (materialId, payload) {
  return api.patch(`/api/print/manager/materials/${materialId}/`, payload)
}

export function deletePrintManagerMaterial (materialId) {
  return api.delete(`/api/print/manager/materials/${materialId}/`)
}

export function fetchPrintJobs () {
  return api.get('/api/printjobs/')
}

export function fetchShopManagerPochtaSettings () {
  return api.get('/api/shop/manager/pochta-settings')
}

export function updateShopManagerPochtaSettings (payload) {
  return api.patch('/api/shop/manager/pochta-settings', payload)
}

export function fetchShopManagerSdekSettings () {
  return api.get('/api/shop/manager/sdek-settings')
}

export function updateShopManagerSdekSettings (payload) {
  return api.patch('/api/shop/manager/sdek-settings', payload)
}

export function fetchStudyManagerCategories () {
  return api.get('/api/study/manager/categories')
}

export function createStudyManagerCategory (payload) {
  return api.post('/api/study/manager/categories', payload)
}

export function updateStudyManagerCategory (categoryId, payload) {
  return api.patch(`/api/study/manager/categories/${categoryId}`, payload)
}

export function deleteStudyManagerCategory (categoryId) {
  return api.delete(`/api/study/manager/categories/${categoryId}`)
}

export function fetchStudyManagerCourses () {
  return api.get('/api/study/manager/courses')
}

export function createStudyManagerCourse (payload) {
  return api.post('/api/study/manager/courses', payload)
}

export function updateStudyManagerCourse (courseId, payload) {
  return api.patch(`/api/study/manager/courses/${courseId}`, payload)
}

export function deleteStudyManagerCourse (courseId) {
  return api.delete(`/api/study/manager/courses/${courseId}`)
}

export function fetchStudyManagerLessons (params = {}) {
  return api.get('/api/study/manager/lessons', { params })
}

export function createStudyManagerLesson (payload) {
  return api.post('/api/study/manager/lessons', payload)
}

export function updateStudyManagerLesson (lessonId, payload) {
  return api.patch(`/api/study/manager/lessons/${lessonId}`, payload)
}

export function deleteStudyManagerLesson (lessonId) {
  return api.delete(`/api/study/manager/lessons/${lessonId}`)
}

export function reorderStudyManagerLessons (payload) {
  return api.post('/api/study/manager/lessons/reorder', payload)
}

export function fetchStudyManagerTeachers (params = {}) {
  return api.get('/api/study/manager/teachers', { params })
}

export function createStudyManagerTeacher (payload) {
  return api.post('/api/study/manager/teachers', payload)
}

export function updateStudyManagerTeacher (teacherId, payload) {
  return api.patch(`/api/study/manager/teachers/${teacherId}`, payload)
}

export function deleteStudyManagerTeacher (teacherId) {
  return api.delete(`/api/study/manager/teachers/${teacherId}`)
}

export function fetchStudyManagerPrices (params = {}) {
  return api.get('/api/study/manager/prices', { params })
}

export function createStudyManagerPrice (payload) {
  return api.post('/api/study/manager/prices', payload)
}

export function updateStudyManagerPrice (priceId, payload) {
  return api.patch(`/api/study/manager/prices/${priceId}`, payload)
}

export function deleteStudyManagerPrice (priceId) {
  return api.delete(`/api/study/manager/prices/${priceId}`)
}

export function fetchStudyManagerFeedbacks (params = {}) {
  return api.get('/api/study/manager/feedbacks', { params })
}

export function createStudyManagerFeedback (payload) {
  return api.post('/api/study/manager/feedbacks', payload)
}

export function updateStudyManagerFeedback (feedbackId, payload) {
  return api.patch(`/api/study/manager/feedbacks/${feedbackId}`, payload)
}

export function deleteStudyManagerFeedback (feedbackId) {
  return api.delete(`/api/study/manager/feedbacks/${feedbackId}`)
}

export function fetchStudyManagerExams (params = {}) {
  return api.get('/api/study/manager/exams', { params })
}

export function createStudyManagerExam (payload) {
  return api.post('/api/study/manager/exams', payload)
}

export function updateStudyManagerExam (examId, payload) {
  return api.patch(`/api/study/manager/exams/${examId}`, payload)
}

export function deleteStudyManagerExam (examId) {
  return api.delete(`/api/study/manager/exams/${examId}`)
}

export function fetchStudyManagerExamQuestions (params = {}) {
  return api.get('/api/study/manager/exam-questions', { params })
}

export function createStudyManagerExamQuestion (payload) {
  return api.post('/api/study/manager/exam-questions', payload)
}

export function updateStudyManagerExamQuestion (questionId, payload) {
  return api.patch(`/api/study/manager/exam-questions/${questionId}`, payload)
}

export function deleteStudyManagerExamQuestion (questionId) {
  return api.delete(`/api/study/manager/exam-questions/${questionId}`)
}

export function fetchStudyManagerExamOptions (params = {}) {
  return api.get('/api/study/manager/exam-options', { params })
}

export function createStudyManagerExamOption (payload) {
  return api.post('/api/study/manager/exam-options', payload)
}

export function updateStudyManagerExamOption (optionId, payload) {
  return api.patch(`/api/study/manager/exam-options/${optionId}`, payload)
}

export function deleteStudyManagerExamOption (optionId) {
  return api.delete(`/api/study/manager/exam-options/${optionId}`)
}

export function fetchCallbackCaptcha () {
  return publicApi.get('/api/callback/captcha')
}

export function createCallbackRequest (payload) {
  return publicApi.post('/api/callback/requests', payload)
}

export function fetchManagerCallbackRequests (params = {}) {
  return api.get('/api/callback/manager/requests', { params })
}

export function updateManagerCallbackRequest (requestId, payload) {
  return api.patch(`/api/callback/manager/requests/${requestId}`, payload)
}
