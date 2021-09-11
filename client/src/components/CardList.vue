<template>
  <div class="card-list">
    <div class="status-title">{{ title }}</div>
    <draggable
      class="list-group"
      tag="ul"
      :value="value"
      v-bind="options"
      :move="onMove"
      @input="(o) => $emit('input', o)"
      @start="isDragging = true"
      @end="isDragging = false"
    >
      <transition-group type="transition" :name="'flip-list'">
        <Card
          v-for="item in value"
          :key="item.id"
          :title="item.title"
          @click.native="onClickCard(item.order)"
        />
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Card from '@/components/Card'
export default {
  name: 'CardList',
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Object,
      default: () => {},
    },
    title: {
      type: String,
      default: '',
    },
  },
  components: {
    draggable,
    Card,
  },
  methods: {
    orderList() {
      this.value = this.value.sort((one, two) => {
        return one.order - two.order
      })
    },
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element
      const draggedElement = draggedContext.element
      return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
    },
    onClickCard(id) {
      console.log('onClickCard', id)
      this.$emit('editCard', id)
    },
  },
}
</script>

<style lang="scss" scoped>
.card-list {
  margin-bottom: 0.75rem;
  border-radius: 0.5rem;
  padding: 1rem;
  background: #dee2e6;
}
</style>
