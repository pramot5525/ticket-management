<template>
  <b-modal
    ref="createModal"
    title="Create New"
    size="lg"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOk"
  >
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-form-group
        label="Title"
        label-for="title-input"
        class="mb-2"
        invalid-feedback="Title is required"
        :state="titleState"
      >
        <b-form-input
          id="title-input"
          v-model="form.title"
          maxlength="255"
          required
          :state="titleState"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Description"
        label-for="decription-input"
        class="mb-2"
      >
        <b-form-textarea
          id="decription-input"
          v-model="form.decription"
          placeholder="e.g. a sample value or a short description"
        ></b-form-textarea>
      </b-form-group>
      <b-form-group label="Contact infomation" label-for="contact-input">
        <b-form-input
          id="contact-input"
          v-model="form.contact"
          placeholder="e.g. 080-1234xxxx, 1234@email.com"
          maxlength="255"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Status"
        label-for="status-input"
        style="width: 200px"
      >
        <b-form-select
          v-model="form.status"
          :options="optionsStatus"
          id="status-input"
        ></b-form-select>
      </b-form-group>
    </form>
  </b-modal>
</template>

<script>
import { optionsStatus } from '@/helper'

export default {
  name: 'CreateCardModal',
  data() {
    return {
      optionsStatus,
      name: '',
      selected: null,
      form: {
        title: '',
        description: '',
        contact: '',
        status: 'pending',
      },
      titleState: null,
    }
  },
  methods: {
    showModal() {
      this.$refs['createModal'].show()
    },
    hideModal() {
      this.$refs['createModal'].hide()
      this.resetModal()
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.titleState = valid
      return valid
    },
    resetModal() {
      this.form = {
        title: '',
        description: '',
        contact: '',
        status: 'pending',
      }
      this.titleState = null
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return
      }

      this.$axios.post('/ticket/create', this.form).then((res) => {
        if (res.data.status === 'ok') {
          console.log(res)
          this.hideModal()
        }
      })
    },
  },
}
</script>
