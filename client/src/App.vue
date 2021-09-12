<template>
  <div id="app">
    <div class="layout layout-nav-side">
      <b-navbar type="dark" variant="dark" :sticky="true" style="color: white">
        <div>Filter</div>
        <b-form-select
          v-model="filter"
          :options="optionsFilter"
          id="filter-input"
          class="mb-4"
        ></b-form-select>
        <div>Sort by</div>
        <b-form-select
          v-model="sort"
          :options="optionsSort"
          id="sort-input"
        ></b-form-select>
      </b-navbar>

      <b-container class="kanban-board">
        <b-row class="my-4">
          <b-col>
            <div class="page-header">
              <h4 class="page-title">Ticket Management</h4>
              <b-button
                variant="outline-primary"
                @click="$refs.createCardModal.showModal()"
                >New Card</b-button
              >
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col col>
            <CardList
              :value="getTickets"
              title="Tickets"
              @editCard="editCardById"
            />
          </b-col>
        </b-row>
      </b-container>
    </div>

    <CreatCardModal ref="createCardModal" />
    <CardDetailModal ref="cardDetailModal" />
  </div>
</template>

<script>
import CardList from '@/components/CardList'
import CreatCardModal from '@/components/modal/CreatCardModal'
import CardDetailModal from '@/components/modal/CardDetailModal'
import { mapGetters, mapActions } from 'vuex'
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import '@/scss/app.scss'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

export default {
  name: 'App',
  components: {
    CardList,
    CreatCardModal,
    CardDetailModal,
  },
  data() {
    return {
      optionsFilter: [
        { value: 'all', text: 'All' },
        { value: 'pending', text: 'Pending' },
        { value: 'accepted', text: 'Accepted' },
        { value: 'resolved', text: 'Resolved' },
        { value: 'rejected', text: 'Rejected' },
      ],
      optionsSort: [
        { text: 'Latest Updated', value: 'latest' },
        { text: 'Status', value: 'status' },
      ],

      sort: 'latest',
      filter: 'all',
    }
  },
  computed: {
    ...mapGetters('ticket', ['getTickets']),
  },
  watch: {
    sort(to) {
      this.fetchTickets(this.filter, to)
    },
    filter(to) {
      this.fetchTickets(to, this.sort)
    },
  },
  mounted() {
    this.fetchTickets(this.filter, this.sort)
  },
  methods: {
    ...mapActions('ticket', ['setTickets']),
    fetchTickets(filter, sort) {
      this.$axios.get('tickets', { params: { filter, sort } }).then((res) => {
        if (res.data.status == 'ok') {
          this.setTickets(res.data.results)
        }
      })
    },
    editCardById(data) {
      this.$refs.cardDetailModal.showModal(data)
    },
  },
}
</script>

<style lang="scss">
#app {
  font-family: 'Kanit', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-weight: 300;
}

.layout {
  display: flex;
}
.layout-nav-side {
  display: flex;

  > .navbar {
    padding: 1.5rem;
    width: 264px;
    height: 100vh;
    overflow-y: scroll;
    -ms-overflow-style: none;
    flex-direction: column;
    align-items: flex-start;
  }
}

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.page-header {
  display: flex;
  align-items: center;
  .page-title {
    margin-right: 20px;
  }
}
</style>
