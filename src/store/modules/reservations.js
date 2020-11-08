import axios from 'axios'

const url = '/api/Reservation'

const state = {
  reservations: [{
    idresa: 1,
    nom_reservation: 'toujours moi',
    nb_place: 5
  }]
}

const mutations = {
  setReservation (state, reservations) {
    state.reservations = reservations
  }
}

const actions = {
  fetchsReservation: async function (context) {
    axios.get(url)
      .then(function (response) {
        console.log(response)
        context.commit('setReservation', response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  supprReservation: async function (context, id) {
    var urltmp = url + '/' + id
    return axios.delete(urltmp)
  },
  newReservation: async function (context, reservation) {
    return axios.post(url, reservation)
  },
  updateReservation: async function (context, { id, reservation }) {
    var urltmp = url + '/' + id
    return axios.put(urltmp, reservation)
  }
}

const getters = {
  getReservations: state => function () {
    return state.reservations
  },
  getResa: state => function (id) {
    var result = state.reservations.find(element => element.idresa === id)
    console.log('coucou' + result)
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
