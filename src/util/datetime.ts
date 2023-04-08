import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/th'

dayjs.extend(relativeTime)
dayjs.locale('th')

export function timeRange(dateTime: Date, withoutSuffix = false) {
    const suffix = withoutSuffix ? '' : 'ที่แล้ว'
    const second = dayjs(new Date()).diff(dateTime, 'second')
    if (second < 60 && second > 2) {
        return `${second} วินาที${suffix}`
    } else if (second<=2) {
        return `ไม่กี่วินาที${suffix}`
    }
    return dayjs(dateTime).fromNow(withoutSuffix)
}

export function timeRangeDate(dateTime: Date) {
    const isoDate = new Date().toISOString()
    const now = new Date(isoDate.substring(0, isoDate.indexOf('T')))
    return dayjs(dateTime).from(now)
}

export function timeFormat(dateTime: Date) {
    return new Date(dateTime).toLocaleString('th', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })
}