export function timeRange(dateTime: Date) {
    return new Date(dateTime).toLocaleString('th', {
        year: 'numeric',
        month: 'narrow',
        day: '2-digit',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
    })
}