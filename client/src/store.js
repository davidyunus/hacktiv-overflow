import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: '',
      name: ''
    },
    articleList: [],
    article: {}
  },
  mutations: {
    setUser: function (state, payload) {
      state.user.username = payload.username
      state.user.name = payload.name
    },
    setArticles: function (state, payload) {
      state.articleList = payload
    },
    setArticleById: function (state, payload) {
      state.article = payload
    }
  },
  actions: {
    register: function (context, payload) {
      return new Promise((resolve, reject) => {
        console.log('masuk')
        axios.post('http://35.198.206.52/register', {
          username: payload.username,
          name: payload.name,
          password: payload.password
        })
          .then(function (response) {
            localStorage.setItem('username', payload.username)
            localStorage.setItem('token', response.data.token)
            context.commit('setUser', payload)
            resolve()
          })
          .catch(function (error) {
            console.log(error)
            reject(error)
          })
      })
    },
    login: function (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://35.198.206.52/login', {
          username: payload.username,
          password: payload.password
        })
          .then(function (response) {
            localStorage.setItem('username', payload.username)
            localStorage.setItem('token', response.data.token)
            // console.log(response.data.token)
            resolve()
          })
          .catch(function (error) {
            console.log(error)
            reject(error)
          })
      })
    },
    getArticles: function (context) {
      axios
        .get('http://35.198.206.52/article')
        .then(response => {
          console.log(JSON.stringify(response.data.data))
          context.commit('setArticles', response.data.data)
        })
        .catch((error) => {
          console.log('error 3 ' + error)
        })
    },
    getArticleDetail: function (context, payload) {
      axios
        .get(`http://35.198.206.52/article/${payload}`)
        .then(response => {
          console.log(JSON.stringify(response.data.data))
          context.commit('setArticleById', response.data.data)
        })
        .catch((error) => {
          console.log('error 3 ' + error)
        })
    },
    addArticle: function (context, payload) {
      let token = localStorage.getItem('token')

      axios.post('http://35.198.206.52/article/post', payload, { headers: { token: token } })
        .then(function (response) {
          // context.commit('setUser', response.data.user)
          axios
            .get('http://35.198.206.52/article')
            .then(response => {
              console.log(JSON.stringify(response.data.data))
              context.commit('setArticles', response.data.data)
            })
            .catch((error) => {
              console.log('error 3 ' + error)
            })
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    deleteArticle: function (context, payload) {
      let token = localStorage.getItem('token')

      axios
        .delete(`http://35.198.206.52/article/delete/${payload}`, { headers: { token: token } })
        .then(response => {
          console.log(JSON.stringify(response))
        })
        .catch((error) => {
          console.log('error 3 ' + error)
        })
    },
    editArticle: function (context, payload) {
      let token = localStorage.getItem('token')

      axios.put(`http://35.198.206.52/article/edit/${payload.id}`, {
        title: payload.title,
        content: payload.content
      }, { headers: { token: token } })
        .then(function (response) {
          // context.commit('setUser', response.data.user)
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    filter: function (context, payload) {
      axios
        .get(`http://35.198.206.52/article/by/${payload}`)
        .then(response => {
          console.log(JSON.stringify(response.data.data))
          context.commit('setArticles', response.data.data)
        })
        .catch((error) => {
          console.log('error 3 ' + error)
        })
    }
  }
})
