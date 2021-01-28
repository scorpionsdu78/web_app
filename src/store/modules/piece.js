import axios from 'axios'

const url = 'http://37.187.119.144:8080/compagnieServer/api/Repertoire'

const state = {
  pieces: [{ id: 1 }]
}

const mutations = {
  setPieces (state, pieces) {
    state.pieces = pieces
  },
  removePiece (state, id) {
    state.pieces = state.pieces.filter((element) => {
      if (id !== element.idrepertoire) {
        console.log(element)
        return element
      }
    })
  },
  addPiece (state, piece) {
    state.pieces.push(piece)
  }
}

const actions = {
  fetchPiece: async function (context) {
    axios.get(url)
      .then(function (response) {
        context.commit('setPieces', response.data)
        return response
      })
      .catch(function (error) {
        console.log(error)
        return error
      })
  },
  deletePiece: async function (context, id) {
    const urltmp = url + '/' + id
    console.log(urltmp)
    axios.delete(urltmp)
      .then(function (response) {
        console.log(response)
        context.commit('removePiece', id)
        return response
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  ajoutPiece: async function (context, piece) {
    console.log(piece)
    axios.post(url, piece)
      .then((response) => {
        console.log(response)
        context.commit('addPiece', response.data)
        return response
      })
      .catch((error) => {
        console.error(error)
        return error
      })
  },
  modifyPiece: async function (context, { id, piece }) {
    const urltmp = url + '/' + id
    axios.put(urltmp, piece)
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
  getPieces: state => function () {
    var result = state.pieces
    console.log(result)
    return result
  },
  getPiece: state => function (id) {
    console.log('coucouc')
    var result = state.pieces.find(element => element.idrepertoire === id)
    console.log(result)
    return result
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
