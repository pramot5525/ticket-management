import moment from 'moment'
export function getBadgeVariant(status) {
  switch (status) {
    case 'pending':
      return 'info'
    case 'resolved':
      return 'success'
    case 'rejected':
      return 'danger'
    case 'accepted':
      return 'primary'
    default:
      break
  }
  return 'light'
}

export function formatDate(dateStr) {
  return moment(dateStr).format('DD MMM YYYY')
}

export function formatDateTime(dateStr) {
  return moment(dateStr).format('DD MMM YYYY (HH:mm)')
}

export const optionsStatus = [
  { value: 'pending', text: 'Pending' },
  { value: 'accepted', text: 'Accepted' },
  { value: 'resolved', text: 'Resolved' },
  { value: 'rejected', text: 'Rejected' },
]
