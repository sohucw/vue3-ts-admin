import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
export const formatUTC = (utcStirng: string, format: string = 'YYYY-MM-DD HH:mm:ss') => {
  const time = dayjs.utc(utcStirng).utcOffset(8).format(format)
  return time
}
