import Vue from 'vue'
import Vuex from 'vuex'

import Article from './modules/articles'
import PieceStore from './modules/piece'
import MembreStore from './modules/membres'
import SpectacleStore from './modules/spectacle'
import PhotosStore from './modules/photos'
import RoleStore from './modules/roles'
import ReservationStore from './modules/reservations'
import MessageStore from './modules/message'
import UserStore from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  actions: {},
  mutations: {},
  getters: {},
  modules: {
    article: Article,
    piece: PieceStore,
    membre: MembreStore,
    spectacle: SpectacleStore,
    photo: PhotosStore,
    role: RoleStore,
    reservation: ReservationStore,
    message: MessageStore,
    user: UserStore
  }
})
