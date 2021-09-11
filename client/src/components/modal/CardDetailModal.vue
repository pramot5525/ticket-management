<template>
  <b-modal
    ref="detailModal"
    title="Submit Your Name"
    size="lg"
    @show="resetModal"
    @hidden="resetModal"
    ok-only
  >
    <template #modal-header="{ close }">
      <div>
        <div>
          <TextEditable type="input" :show-title="false" />
        </div>
        <b-badge class="ml-2" variant="primary">Primary</b-badge>
      </div>
      <button class="close" @click="close()">
        <i class="material-icons"> close </i>
      </button>
    </template>

    <TextEditable title="Description" type="textarea" />
    <TextEditable title="Contact" type="input" />
    <div>Create Date: 17 March 2018 1:00 PM</div>
    <div>Latest Update Date: 17 March 2018 1:00 PM</div>
  </b-modal>
</template>

<script>
import TextEditable from '@/components/TextEditable'
export default {
  name: 'CreateCardModal',
  components: {
    TextEditable,
  },
  data() {
    return {
      options: [{ value: 3, text: 'Hight' }],
      selected: null,
    }
  },
  methods: {
    showModal() {
      this.$refs['detailModal'].show()
    },
    hideModal() {
      this.$refs['detailModal'].hide()
    },
    resetModal() {},
    handleOk() {},
  },
}
</script>
