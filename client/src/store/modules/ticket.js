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
    commit('UPDATE_TICKET', ticket)
  },
  addTicket({ commit }, ticket) {
    commit('ADD_TICKET', ticket)
  }
}

const mutations = {
  SET_TICKETS(state, tickets) {
    state.tickets = tickets
  },
  UPDATE_TICKET(state, ticket) {
    const item = state.tickets.find((o) => o.id === ticket.id)
    if (item) {
      Object.assign(item, ticket)
    }
  },
  ADD_TICKET(state, ticket) {
    state.tickets.unshift(ticket)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
