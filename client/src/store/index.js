import Vue from 'vue'
import Vuex from 'vuex'
import ticket from './modules/ticket'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ticket,
  },
})
