import axios from 'axios'

const url = 'http://37.187.119.144:8080/compagnieServer/api/Article'

const state = {
  articles: [{
    id: -1,
    title: 'ceci est un titre'
  },
  {
    id: 0,
    title: 'ceci est un titre 2'
  }]
}

const mutations = {
  setArticle (state, articles) {
    state.articles = articles
  }
}

const actions = {
  fetchsArticles: async function (context) {
    axios.get(url)
      .then(function (response) {
        console.log(response)
        context.commit('setArticle', response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  deleteArticle: async function (context, id) {
    console.log(url + '/' + id)
    const urltmp = url + '/' + id
    await axios.delete(urltmp)
      .then(function (response) {
        return response
      })
      .catch(function (err) {
        console.log(err)
        return err
      })
  },
  createArticle: async function (context, article) {
    await axios.post(url, article)
      .then(function (response) {
        console.log(response)
        return response.data
      })
      .catch(function (err) {
        console.log(err)
        return err
      })
  },
  modifyArticle: async function (context, { id, article }) {
    const urltmp = url + '/' + id
    console.log(article)
    await axios.put(urltmp, article)
      .then(function (response) {
        console.log(response)
        return response
      })
      .catch(function (err) {
        console.log(err)
        return err
      })
  }
}

const getters = {
  getArticles: state => function () {
    return state.articles
  },
  getArticle: state => function (id) {
    return state.articles.find(element => element.idarticle === id)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
