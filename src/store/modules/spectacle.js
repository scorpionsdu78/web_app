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
    return axios.get(url)
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
  },
  getDates: state => function () {
    var result = state.spectacles.map(element => {
      var tmp = {
        name: element.nom,
        start: Date.parse(element.dates),
        end: Date.parse(element.dates),
        details: element.repertoire.nom + ' - ' + element.repertoire.auteur + ' - ' + element.prix
      }
      console.log(tmp)
      return tmp
    })
    return result
  },
  getFutur: state => function () {
    var today = new Date()
    var result = state.spectacles.filter(element => { return today <= Date.parse(element.dates) })
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
