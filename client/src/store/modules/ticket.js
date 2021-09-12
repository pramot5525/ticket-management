const state = () => ({
  tickets: [],
})

const getters = {
  getTickets(state) {
    return state.tickets
  },
}

const actions = {
  setTickets({ commit }, tickets) {
    commit('SET_TICKETS', tickets)
  },
  updateTicketById({ commit }, ticket) {
    console.log('updateTicketById', ticket)
    commit('UPDATE_TICKET', ticket)
  },
}

const mutations = {
  SET_TICKETS(state, tickets) {
    state.tickets = tickets
  },
  UPDATE_TICKET(state, ticket) {
    // let target = state.tickets.find((o) => o.id === ticket.id)
    // if (target) {
    //   target = { ...target, ...ticket }
    // }
    const index = state.tickets.findIndex((c) => c.id === ticket.id)
    console.log('UPDATE_TICKET index', index)
    // state.tickets[index] = ticket
    const item = state.tickets.find((o) => o.id === ticket.id)
    if (item) {
      Object.assign(item, ticket)
    }
    // Vue.set(state, 'items', [...items]);
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
