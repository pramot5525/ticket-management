<template>
  <div class="card-list">
    <div class="status-title">{{ title }}</div>
    <transition-group class="card-list" type="transition" :name="'flip-list'">
      <Card
        v-for="item in value"
        :key="item.id"
        :title="item.title"
        :status="item.status"
        :update-at="item.updatedAt"
        :description="item.description"
        @click.native="onClickCard(item)"
      />
    </transition-group>
    <!-- </draggable> -->
  </div>
</template>

<script>
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
    Card,
  },
  methods: {
    onClickCard(data) {
      this.$emit('editCard', data)
    },
  },
}
</script>

<style lang="scss" scoped>
.card-list {
  width: 100%;
  margin-bottom: 0.75rem;
  border-radius: 0.5rem;
  padding: 1rem;
  background: #dee2e6;
  display: flex;
  flex-wrap: wrap;
}
</style>
