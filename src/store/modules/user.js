import axios from 'axios'
var passwordHash = require('password-hash')
const url = '/api/User'

const state = {
  login: false
}

const mutations = {
  setLogin: function (state) {
    state.login = true
  }
}

const actions = {
  login: async function (context, user) {
    console.log(user.password)
    console.log(user.username)
    return axios.get(url + '/' + user.username)
      .then((response) => {
        console.log(response)
        if (passwordHash.verify(user.password, response.data.password)) {
          context.commit('setLogin')
        }
      })
      .catch((error) => {
        console.error(error)
        return error
      })
  }
}

const getters = {
  getLogin: state => function () {
    return state.login
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
