import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/th'

dayjs.extend(relativeTime)
dayjs.locale('th')

export function timeRange(dateTime: Date) {
    const second = dayjs(new Date()).diff(dateTime, 'second')
    if (second < 60 && second > 2) {
        return `${second} วินาทีที่แล้ว`
    } else if (second<=2) {
        return `ไม่กี่วินาทีที่แล้ว`
    }
    return dayjs(dateTime).fromNow()
}