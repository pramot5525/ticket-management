<template>
  <div
    class="editable"
    :class="{ active: editable }"
    @click="!disabled ? (!editable ? startEdit() : null) : null"
  >
    <div v-if="showTitle" class="title" :class="{ active: !editable }">
      {{ title }}
      <span class="material-icons"> edit </span>
    </div>
    <div
      v-if="!editable"
      @click="!disabled ? startEdit() : null"
      class="text detail"
      :class="{ highlight: text }"
    >
      {{ text }}<span v-if="!text">{{ placeholder }}</span>
    </div>
    <div v-else class="edit-text">
      <textarea
        v-if="type === 'textarea'"
        ref="textarea"
        v-model="data"
        cols="30"
        rows="4"
        maxlength="255"
      ></textarea>
      <input v-else ref="input" v-model="data" type="text" maxlength="255" />
      <div class="submit-edit">
        <i class="material-icons" @click="cancelEdit"> close </i>
        <b-button variant="primary" @click="saveChanges">Save</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextEditable',

  props: {
    title: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'textarea',
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      editable: false,
      data: this.text || '',
      isLoading: false,
    }
  },

  watch: {
    editable(status) {
      if (status) {
        setTimeout(() => {
          if (this.$refs.textarea) this.$refs.textarea.focus()
          if (this.$refs.input) this.$refs.input.focus()
        }, 200)
      }
    },
  },

  methods: {
    saveChanges() {
      this.isLoading = true
      const callBack = () => {
        this.editable = false
        this.isLoading = false
      }
      this.$emit('save-changes', this.data, callBack)
    },

    startEdit(e) {
      this.editable = true
      this.$emit('start-edit')
      if (e) {
        e.stopPropagation()
      }
    },

    cancelEdit(e) {
      this.editable = false
      this.data = this.text
      if (e) {
        e.stopPropagation()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.editable {
  &.active {
    cursor: pointer;
  }

  &:hover {
    .title span {
      opacity: 1 !important;
    }
  }
}
.title {
  &.active {
    cursor: pointer;
  }

  span {
    opacity: 0;
    font-size: 11px;
    margin-right: 2px;
  }
}
.text {
  cursor: pointer;
  word-wrap: break-word;
  white-space: pre-wrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
  line-height: 1.23;

  span {
    color: #b4b4b4;
  }
}
.submit-edit {
  display: flex;
  align-items: center;
  i {
    cursor: pointer;
    font-size: 16px;
    padding: 0 10px;
  }
  /deep/ button {
    font-size: 12px;
    min-height: unset;
    // min-width: 65px;
    margin-right: 5px;
  }
}
textarea,
input {
  font-size: 13px;
  width: 100%;
  padding: 10px 8px;
  border-radius: 3px;
  border: solid 1px #6f6f6f;
  margin-bottom: 10px;

  outline: none;
}
</style>
