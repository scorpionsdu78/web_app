import axios from 'axios'

const url = '/api/Spectacle'

const state = {
  spectacles: []
}

const mutations = {
  setSpectacles: function (state, spectacles) {
    state.spectacles = spectacles
  },
  removeSpectacle: function (state, id) {
    state.spectacles = state.spectacles.filter(element => id !== element.idspectacle)
  },
  addSpectacle: function (state, spectacle) {
    state.spectacles.push(spectacle)
  }
}

const actions = {
  fetchSpectacle: async function (context) {
    axios.get(url)
      .then((response) => {
        console.log(response)
        context.commit('setSpectacles', response.data)
      })
      .catch((error) => {
        console.error(error)
        return error
      })
  },
  deleteSpectacle: async function (context, id) {
    const urltmp = url + '/' + id
    console.log(urltmp)
    axios.delete(urltmp)
      .then(function (response) {
        console.log(response)
        context.commit('removeSpectacle', id)
        return response
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  ajoutSpectacle: async function (context, spectacle) {
    axios.post(url, spectacle)
      .then(function (response) {
        console.log(response)
        context.commit('addSpectacle', response.data)
        return response
      })
      .catch(function (error) {
        console.error(error)
      })
  },
  modifSpectacle: async function (context, { id, spectacle }) {
    const urltmp = url + '/' + id
    console.log(urltmp)
    axios.put(urltmp, spectacle)
      .then(function (response) {
        console.log(response)
        return response
      })
      .catch(function (error) {
        console.error(error)
        return error
      })
  }
}

const getters = {
  getSpectacles: state => function () {
    return state.spectacles
  },
  getSpectacle: state => function (id) {
    var result = state.spectacles.find(element => element.idspectacle === id)
    return result
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
