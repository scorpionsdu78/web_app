import axios from 'axios'

const url = '/api/Photo'

const state = {
  photos: []
}

const mutations = {
  setPhotos (state, photos) {
    state.photos = photos
  }
}

const actions = {
  fetchsPhotos: async function (context) {
    axios.get(url)
      .then(function (response) {
        console.log(response)
        context.commit('setPhotos', response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

const getters = {
  getPhotos: state => function () {
    return state.photos
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
