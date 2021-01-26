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
    return axios.get(url)
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
  },
  getPhotosTransform: state => function () {
    console.log('entrez get')
    console.log(state.photos)
    var dataImages = state.photos.map((Element) => {
      return { idphoto: Element.idphoto, src: 'http://37.187.119.144:8080/compagnieServer/api/Image/' + Element.url, alt: Element.url }
    })
    return dataImages
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
