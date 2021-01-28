import axios from 'axios'

const url = 'http://37.187.119.144:8080/compagnieServer/api/Message'

const state = {
  messages: []
}

const mutations = {
  setMessages (state, messages) {
    state.messages = messages
  }
}

const actions = {
  newMessage: async function (context, message) {
    await axios.post(url, message)
      .then(function (response) {
        console.log(response)
        return response.data
      })
      .catch(function (err) {
        console.log(err)
        return err
      })
  },
  fetchMessages: async function (context) {
    return axios.get(url)
      .then(function (response) {
        context.commit('setMessages', response.data)
        return response
      })
      .catch(function (err) {
        console.log(err)
        return err
      })
  },
  traiterMessage: async function (context, id) {
    var urltmp = url + '/' + id
    return axios.put(urltmp)
  }
}

const getters = {
  getMessages: state => function () {
    return state.messages
  },
  getMessage: state => function (id) {
    var result = state.messages.find(element => element.idmessage === id)
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
