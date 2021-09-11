<template>
  <div id="app">
    <div class="layout layout-nav-side">
      <b-navbar toggleable="sm" type="dark" variant="dark" :sticky="true">
        <b-navbar-toggle target="nav-text-collapse">sss</b-navbar-toggle>
        <b-navbar-brand>Kanban Board</b-navbar-brand>
        <b-navbar-nav>
          <b-form-input type="text" placeholder="search..."></b-form-input>
          <!-- <span class="material-icons-outlined"> search </span> -->
        </b-navbar-nav>
      </b-navbar>

      <b-container class="kanban-board">
        <b-row class="my-4">
          <b-col>
            <div class="page-header">
              <h4 class="page-title">Kanband Board</h4>
              <b-button
                variant="outline-primary"
                @click="$refs.createCardModal.showModal()"
                >New Card</b-button
              >
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col col lg="3">
            <CardList
              v-model="pending"
              :options="dragOptions"
              title="Pending"
              @editCard="editCardById"
            />
          </b-col>

          <b-col col lg="3">
            <CardList
              v-model="accepted"
              :options="dragOptions"
              title="Accepted"
              @editCard="editCardById"
            />
          </b-col>
          <b-col col lg="3">
            <CardList
              v-model="resolved"
              :options="dragOptions"
              title="Resolved"
              @editCard="editCardById"
            />
          </b-col>
          <b-col col lg="3">
            <CardList
              v-model="rejected"
              :options="dragOptions"
              title="Rejected"
              @editCard="editCardById"
            />
          </b-col>
        </b-row>
      </b-container>
    </div>
    <b-badge variant="primary">Primary</b-badge>

    <CreatCardModal ref="createCardModal" />
    <CardDetailModal ref="cardDetailModal" />
  </div>
</template>

<script>
import CardList from '@/components/CardList'
import CreatCardModal from '@/components/modal/CreatCardModal'
import CardDetailModal from '@/components/modal/CardDetailModal'

import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import '@/scss/app.scss'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

// const message = [
//   'ภาษาไทย',
//   'draggable',
//   'component',
//   'for',
//   'vue.js 2.0',
//   'based',
//   'on',
//   'Sortablejs',
// ]

export default {
  name: 'App',
  components: {
    CardList,
    CreatCardModal,
    CardDetailModal,
  },
  data() {
    return {
      pending: [],
      accepted: [],
      resolved: [],
      rejected: [],
      editable: true,
      isDragging: false,
      delayedDragging: false,
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: 'description',
        disabled: !this.editable,
        ghostClass: 'ghost',
      }
    },
    listString() {
      return JSON.stringify(this.list, null, 2)
    },
    list2String() {
      return JSON.stringify(this.list2, null, 2)
    },
  },
  watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true
        return
      }
      this.$nextTick(() => {
        this.delayedDragging = false
      })
    },
  },
  mounted() {
    this.$axios.get('tickets').then((res) => {
      // console.log(res)
      if (res.data.status == 'ok') {
        this.pending = res.data.results.filter((o) => o.status === 'pending')
        this.accepted = res.data.results.filter((o) => o.status === 'accepted')
        this.resolved = res.data.results.filter((o) => o.status === 'resolved')
        this.rejected = res.data.results.filter((o) => o.status === 'rejected')
      }
    })
  },
  methods: {
    orderList() {
      this.list = this.list.sort((one, two) => {
        return one.order - two.order
      })
    },
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element
      const draggedElement = draggedContext.element
      return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
    },
    editCardById(id) {
      console.log('editCardById', id)
      this.$refs.cardDetailModal.showModal()
    },
  },
}
</script>

<style lang="scss">
#app {
  font-family: 'Kanit', sans-serif;
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-weight: 300;
  /* margin-top: 60px; */
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
  // justify-content: center;
  align-items: center;
  .page-title {
    margin-right: 20px;
  }
}
</style>
