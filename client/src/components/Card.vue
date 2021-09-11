<template>
  <b-card class="card-kanban mb-2" style="max-width: 20rem">
    <div>
      <div class="c-header">
        <div class="c-title">{{ title }}</div>
        <i class="material-icons c-edit">more_vert</i>
      </div>
      <div class="c-desc">contact: {{ contactInfomation }}</div>
      <div class="c-latest-date">Latest Date: {{ updateAt }}</div>
    </div>
  </b-card>
</template>

<script>
export default {
  name: 'Card',
  props: {
    id: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: 'just description',
    },
    contactInfomation: {
      type: String,
      default: '085-655698, admin@gmail.com',
    },
    createAt: {
      type: String,
      default: '01 Sep 2021 22:00',
    },
    updateAt: {
      type: String,
      default: '18 Aug 2021 15:15',
    },
  },
}
</script>

<style lang="scss" scoped>
.card-kanban {
  user-select: none;
  outline: none !important;
  cursor: grab;
  border-radius: 8px;
  &:active {
    cursor: grabbing;
  }

  .card-body {
    padding: 1rem;
    text-align: left;

    .c-header {
      display: flex;
      justify-content: space-between;
      font-weight: 600;

      .c-edit {
        cursor: pointer;
        opacity: 0;
      }
    }
  }
  &:hover .c-header .c-edit {
    opacity: 1;
  }
}
</style>
