import { createStore } from "vuex";
import { auth } from "./auth.module";
import { shop } from "./shop/index.js";
import axios from 'axios'

const store = createStore({
  state: {
    categories: [],
    products: [],
    product: [],
    courses: [],
    course: [],
    pochta_offices: [],
    sdek_offices: [],
    user_location: [],
    delivery_price: [],

    domain: 'http://localhost:8081',
    // domain: 'https://krint.tech'
  },
  getters: {

  },
  modules: {
    auth,
    shop,
  },
  mutations: {
    setCategoriesData(state, categoriesData) {
      state.categories = categoriesData
    },
    setProductsData(state, productsData) {
      state.products = productsData.map(product => {
        return {
          id: product.id,
          category: product.category,
          name: product.name,
          description: product.description,
          price: product.price,
          mass: product.mass,
          stock: product.stock,
          photo: product.photo,
          product_attrs_values: product.product_attrs_values
        };
      });
    },
    setProductData(state, productData) {
      state.product = productData
    },
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
        };
      });
    },
    setCourseData(state, courseData) {
      state.course = courseData
    },
    setPochtaOffices(state, pochtaOffices) {
      state.pochta_offices = pochtaOffices
    },
    setSdekOffices(state, pochtaOffices) {
      state.sdek_offices = pochtaOffices
    },
    setPrice(state, DeliveryPrice) {
      state.delivery_price = DeliveryPrice
    },
    setUserLocation(state, userLocation) {
      state.user_location = userLocation
    },
  },
  actions: {

    fetchCategories({ commit, state }) {
      axios
        .get('http://localhost:8081/api/shop/categories', {
          headers: {
            // 'Authorization': `Bearer ${token}`,
            // 'Basic': 'YWRtaW5AaW5mbzgwOTc6QXZpYXRvcnNrYXlhMTY=',
            // 'Content-Type': 'application/json',
            // "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
            // "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
            // 'Access-Control-Allow-Origin': '*',
          },
        })
        .then(response => {
          commit("setCategoriesData", response.data);
        })
        .catch(e => {
          console.log(e); 
        });
    },
    fetchProducts({ commit, state }) {
      axios
        .get('http://localhost:8081/api/shop/products', {
          headers: {
            // 'Authorization': `Bearer ${token}`,
            // 'Basic': 'YWRtaW5AaW5mbzgwOTc6QXZpYXRvcnNrYXlhMTY=',
            // 'Content-Type': 'application/json',
            // "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
            // "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
            // 'Access-Control-Allow-Origin': '*',
          },
        })
        .then(response => {
          commit("setProductsData", response.data);
        })
        .catch(e => {
          console.log(e); 
        });
    },
    fetchUserLocation({ commit, state }) {
      axios
        .get('https://ipgeolocation.abstractapi.com/v1/?api_key=28400f98798f43aa9c5bd5fa15be0ce0', {
          headers: {
            // 'Authorization': `Bearer ${token}`,
            // 'Basic': 'YWRtaW5AaW5mbzgwOTc6QXZpYXRvcnNrYXlhMTY=',
            // 'Content-Type': 'application/json',
            // "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
            // "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
            // 'Access-Control-Allow-Origin': '*',
          },
        })
        .then(response => {
          commit("setUserLocation", response.data);
        })
        .catch(e => {
          console.log(e); 
        });
    },
    fetchPochtaOffices({ commit, state }, location) {
      axios
        .get('http://localhost:8081/api/shop/pochta_rossii/offices', {
          
          params: {
             lat: location.lat, 
             lon: location.lon,
          }
        })
        .then(response => {
          commit("setPochtaOffices", response.data);
        })
        .catch(e => {
          console.log(e); 
        });
    },
    fetchSdekOffices({ commit, state }, postal_code) {
      console.log('Postal Sdek code: ', postal_code)
      axios
        .get('http://localhost:8081/api/shop/sdek/offices', {
          
          params: {
            postal_code: postal_code,
          }
        })
        .then(response => {
          commit("setSdekOffices", response.data);
        })
        .catch(e => {
          console.log(e); 
        });
    },
    fetchPochtaPrice({ commit, state }, data) {
      axios
        .get('http://localhost:8081/api/shop/pochta_rossii/price', {
          params: {
             destination: data.destination,
             products_mass: data.products_mass
          }
        })
        .then(response => {
          commit("setPrice", response.data);
        })
        .catch(e => {
          console.log(e); 
        });
    },
    fetchSdekPrice({ commit, state }, data) {
      axios
        .get('http://localhost:8081/api/shop/sdek/price', {
          params: {
             destination: data.destination,
             products_mass: data.products_mass
          }
        })
        .then(response => {
          commit("setPrice", response.data);
        })
        .catch(e => {
          console.log(e)
        });
    },
    fetchCategoryProducts({ commit, state }, id) {
      axios
      .get('http://localhost:8081/api/shop/categories/' + Number(id), {
      })
      .then(response => {
        commit("setProductsData", response.data.products);
      })
      .catch(e => {
        console.log(e); 
      });
    },
    fetchProduct({ commit, state }, id) {
      axios
      .get('http://localhost:8081/api/shop/products/' + Number(id), {
      })
      .then(response => {
        commit("setProductData", response.data);
      })
      .catch(e => {
        console.log(e); 
      });
    },
    fetchCourses({ commit, state }) {
      axios
        .get('http://localhost:8081/api/study/courses', {
          headers: {
            // 'Authorization': `Bearer ${token}`,
            // 'Basic': 'YWRtaW5AaW5mbzgwOTc6QXZpYXRvcnNrYXlhMTY=',
            // 'Content-Type': 'application/json',
            // "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
            // "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
            // 'Access-Control-Allow-Origin': '*',
          },
        })
        .then(response => {
          commit("setCoursesData", response.data);
        })
        .catch(e => {
          console.log(e); 
        });
    },
    fetchCourse({ commit, state }, id) {
        axios
        .get('http://localhost:8081/api/study/course/' + Number(id), {
        })
        .then(response => {
          commit("setCourseData", response.data);
        })
        .catch(e => {
          console.log(e); 
        });
    },
  }
})

export default store;

