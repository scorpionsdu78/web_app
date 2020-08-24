import axios from 'axios'

const url = 'api/Membre'

const state = {
  membres: []
}

const mutations = {
  setMembre (state, membres) {
    state.membres = membres
  },
  add (stare, membre) {
    state.membres = state.membres.push(membre)
  }
}

const actions = {
  fetchMembre: async function (context) {
    console.log('entrez dans fetch membres')
    await axios.get(url)
      .then(function (response) {
        console.log(response.data)
        context.commit('setMembre', response.data)
        return response
      })
      .catch(function (error) {
        console.log(error)
        return error
      })
  },
  addMembre: async function (context, membre) {
    console.log(membre)
    await axios.post(url, membre)
      .then(function (response) {
        console.log(response.data)
        context.commit('add', response.data)
        return response
      })
      .catch(function (error) {
        console.log(error)
        return error
      })
  },
  editMembre: async function (context, { id, membre }) {
    var urltmp = url + '/' + id
    console.log(urltmp)
    await axios.put(urltmp, membre)
      .then(function (response) {
        console.log(response)
        return response
      })
      .catch(function (error) {
        console.log(error)
        return error
      })
  },
  suprMembre: async function (context, id) {
    var urltmp = url + '/' + id
    console.log(urltmp)
    await axios.delete(urltmp)
      .then(function (response) {
        console.log(response)
        return response
      })
      .catch(function (error) {
        console.log(error)
        return error
      })
  }
}

const getters = {
  getMembres: state => function () {
    console.log(state.membres)
    return state.membres
  },
  getMembre: state => function (id) {
    return state.membres.find(Element => Element.idMembre === id)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
