<template>
  <b-card class="card-kanban mb-2">
    <div>
      <div class="c-header">
        <div class="c-title">
          <div class="title">{{ title }}</div>
          <b-badge pill :variant="badgeVariant">{{ status }}</b-badge>
        </div>
        <i class="material-icons c-edit">edit</i>
      </div>
      <div class="c-desc">{{ description }}</div>
      <div class="c-latest-date">{{ formatDate(updateAt) }}</div>
    </div>
  </b-card>
</template>

<script>
import { getBadgeVariant, formatDate } from '@/helper'
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
      default: '',
    },
    contactInfomation: {
      type: String,
      default: '',
    },
    createAt: {
      type: String,
      default: '',
    },
    updateAt: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      default: 'pending',
    },
  },
  computed: {
    badgeVariant() {
      return getBadgeVariant(this.status)
    },
  },
  methods: {
    formatDate,
  },
}
</script>

<style lang="scss" scoped>
.card-kanban {
  user-select: none;
  outline: none !important;
  cursor: pointer;
  border-radius: 8px;
  flex: 1 0 21%;
  margin: 4px;
  flex: 0 1 calc(25% - 8px);
  @media (max-width: 978px) {
    flex: 0 1 calc(50% - 8px);
  }

  .card-body {
    padding: 1.2rem 1rem;
    text-align: left;

    .c-header {
      display: flex;
      justify-content: space-between;
      font-weight: 600;
      .c-title {
        display: flex;
        align-items: center;
        // text-transform: capitalize;
        word-wrap: break-word;
        overflow: hidden;
        .title {
          overflow: hidden;
        }
        span {
          margin-left: 10px;
          position: absolute;
          right: 5px;
          top: 4px;
        }
      }
      .c-edit {
        cursor: pointer;
        opacity: 0;
        font-size: 16px;
        position: absolute;
        top: 25px;
        right: 5px;
      }
    }
    .c-desc {
      font-size: 14px;
      height: 44px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .c-latest-date {
      color: rgb(152, 166, 173);
      text-align: right;
      font-size: 12px;
    }
  }
  &:hover .c-header .c-edit {
    opacity: 1;
  }
}
</style>
