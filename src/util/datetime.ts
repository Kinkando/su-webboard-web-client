import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/th'

dayjs.extend(relativeTime)
dayjs.locale('th')

export function timeRange(dateTime: Date) {
    return dayjs(dateTime).fromNow()
    // return new Date(dateTime).toLocaleString('th', {
    //     year: 'numeric',
    //     month: 'narrow',
    //     day: '2-digit',
    //     hour12: false,
    //     hour: '2-digit',
    //     minute: '2-digit'
    // })
}