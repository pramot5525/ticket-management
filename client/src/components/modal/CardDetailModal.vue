<template>
  <b-modal
    ref="detailModal"
    title="Submit Your Name"
    size="lg"
    :hide-footer="true"
  >
    <template #modal-header="{ close }">
      <div class="modal-title">
        <div>
          <TextEditable
            :text="title"
            type="input"
            :show-title="false"
            @save-changes="onSaveTitle"
          />
        </div>
        <b-badge class="text-capitalize" :variant="badgeVariant">{{
          status
        }}</b-badge>
      </div>
      <button class="close" @click="close()">
        <i class="material-icons"> close </i>
      </button>
    </template>
    <div class="detail">
      <TextEditable
        :text="description"
        title="Description"
        type="textarea"
        class="mb-2"
        placeholder="e.g. a sample value or a short description"
        @save-changes="onSaveDescription"
      />
      <TextEditable
        :text="contactInformation"
        title="Contact"
        type="input"
        class="mb-2"
        placeholder="e.g. 080-1234xxxx, 1234@email.com"
        @save-changes="onSaveContact"
      />
      <b-form-group
        class="mb-4"
        label="Status"
        label-for="status-input"
        style="width: 200px"
      >
        <b-form-select
          v-model="status"
          :options="optionsStatus"
          id="status-input"
          @change="onChangeStatus"
        ></b-form-select>
      </b-form-group>
      <hr />
      <div class="update-date">
        <p>
          Create Date <span>{{ formatDateTime(createdAt) }}</span>
        </p>
        <p>
          Latest Update Date <span>{{ formatDateTime(updatedAt) }}</span>
        </p>
      </div>
    </div>

    <template modal-header></template>
  </b-modal>
</template>

<script>
import TextEditable from '@/components/TextEditable'
import { getBadgeVariant, formatDateTime, optionsStatus } from '@/helper'
import { mapActions } from 'vuex'

export default {
  name: 'CreateCardModal',
  components: {
    TextEditable,
  },
  data() {
    return {
      optionsStatus,
      updatedAt: null,
      createdAt: null,
      title: '',
      status: '',
      description: '',
      contactInformation: '',
      id: 0,
    }
  },
  computed: {
    badgeVariant() {
      return getBadgeVariant(this.status)
    },
  },
  methods: {
    ...mapActions('ticket', ['updateTicketById']),
    formatDateTime,
    showModal(data) {
      this.updateModel(data)
      this.$refs['detailModal'].show()
    },
    updateModel(data) {
      this.id = data.id
      this.title = data.title
      this.status = data.status
      this.contactInformation = data.contact_information
      this.description = data.description
      this.updatedAt = data.updatedAt
      this.createdAt = data.createdAt
    },
    hideModal() {
      this.$refs['detailModal'].hide()
    },
    onSaveTitle(title, cb) {
      console.log('onSaveTitle')
      this.$axios.patch(`/ticket/${this.id}`, { title }).then((res) => {
        if (res.data.status === 'ok') {
          const { ticket } = res.data.results
          this.updateTicketById(ticket)
          this.updateModel(ticket)
          cb()
        }
      })
    },
    onSaveContact(contact, cb) {
      this.$axios
        .patch(`/ticket/${this.id}`, { contactInformation: contact })
        .then((res) => {
          if (res.data.status === 'ok') {
            const { ticket } = res.data.results
            this.updateTicketById(ticket)
            this.updateModel(ticket)
            cb()
          }
        })
    },
    onSaveDescription(description, cb) {
      this.$axios.patch(`/ticket/${this.id}`, { description }).then((res) => {
        if (res.data.status === 'ok') {
          const { ticket } = res.data.results
          this.updateTicketById(ticket)
          this.updateModel(ticket)
          cb()
        }
      })
    },
    onChangeStatus(status) {
      this.$axios.patch(`/ticket/${this.id}`, { status }).then((res) => {
        if (res.data.status === 'ok') {
          const { ticket } = res.data.results
          this.updateTicketById(ticket)
          this.updateModel(ticket)
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.detail {
  padding: 12px;
}
.update-date {
  display: flex;
  justify-content: space-between;
  font-size: 1rem;

  span {
    display: block;
    font-size: 14px;
  }
}
.modal-title {
  display: block;
  div,
  span {
    display: inline-block;
    vertical-align: top;
  }
  span {
    margin-left: 25px;
  }
  /deep/ .text {
    font-weight: 600;
    font-size: 18px;
    border: none;
    padding: none;
  }
}
</style>
