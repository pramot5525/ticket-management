<template>
  <b-modal
    ref="createModal"
    title="Submit Your Name"
    size="lg"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOk"
  >
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-form-group
        label="Title"
        label-for="name-input"
        class="mb-2"
        invalid-feedback="Name is required"
      >
        <!-- :state="nameState" -->

        <b-form-input id="name-input" v-model="name" required></b-form-input>
      </b-form-group>

      <b-form-group
        label="Description"
        label-for="decription-input"
        class="mb-2"
      >
        <b-form-textarea id="decription-input" v-model="name"></b-form-textarea>
      </b-form-group>
      <b-form-group label="Contact infomation" label-for="name-input">
        <b-form-input id="name-input" v-model="name"></b-form-input>
      </b-form-group>

      <b-form-group label="Status" label-for="name-input">
        <b-form-select v-model="selected" :options="options"></b-form-select>
      </b-form-group>
    </form>
  </b-modal>
</template>

<script>
export default {
  name: 'CreateCardModal',
  data() {
    return {
      name: '',
      options: [{ value: 3, text: 'Hight' }],
      selected: null,
    }
  },
  methods: {
    showModal() {
      this.$refs['createModal'].show()
    },
    hideModal() {
      this.$refs['createModal'].hide()
    },
    resetModal() {},
    handleSubmit() {},
    handleOk() {},
  },
}
</script>
