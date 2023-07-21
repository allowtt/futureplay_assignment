import moment from 'moment-timezone'
import { TIME_ZONE } from 'src/config/server'

export const Utils = {
  getNowMoment() {
    return moment()
  },
  getNowDate() {
    return Utils.getNowMoment().toDate()
  },
  getNowDateToken() {
    return this.getNowMoment().tz(TIME_ZONE).format('YYYY-MM-DD')
  },
  getNowMomentTZ() {
    return this.getNowMoment().tz(TIME_ZONE)
  },
  getMomentTZ(d: Date) {
    return moment(d).tz(TIME_ZONE)
  },
  getMomentTZByString(str: string, format: string) {
    return moment(str, format).tz(TIME_ZONE)
  },
  getNowDateString() {
    return this.getNowMoment().tz(TIME_ZONE).format('YYYYMMDDHHmmss')
  },
}
