import axios from 'axios'

const url = '/api/Role'

const state = {
  roles: [{
    idrole: 0,
    nom: 'test'
  }]
}

const mutations = {
  setRoles (state, roles) {
    state.roles = roles
  }
}

const actions = {
  fetchsRoles: async function (context) {
    axios.get(url)
      .then(function (response) {
        console.log(response)
        context.commit('setRoles', response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  supprRole: async function (context, id) {
    var urltmp = url + '/' + id
    return axios.delete(urltmp)
  },
  newRole: async function (context, role) {
    return axios.post(url, role)
  }
}

const getters = {
  getRoles: state => function () {
    return state.roles
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
