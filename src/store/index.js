import { createStore } from "vuex";
import { auth } from "./auth.module";
import axios from 'axios'

const store = createStore({
  state: {
    products: [],
    courses: [],

    domain: 'http://localhost:8081',
    // domain: 'https://krint.tech'
  },
  modules: {
    auth,
  },
  mutations: {
    setProductsData(state, productsData) {
      state.products = productsData.map(product => {
        return {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          photo: product.photo
        };
      });
    },
    setCoursesData(state, coursesData) {
      state.courses = coursesData.map(course => {
        return {
          id: course.id,
          name: course.name,
          description: course.description,
          price: course.price,
          photo: course.photo,
          duration: course.duration
        };
      });
    },
  },
  actions: {
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
  }
})

export default store;

