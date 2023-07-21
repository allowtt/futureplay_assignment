import moment from 'moment-timezone'
import { TIME_ZONE } from 'src/config/server'
import bcrypt from 'bcryptjs'
import { FuturePlayError } from './errors'
import _, { isFunction } from 'lodash'
import { HttpException } from '@nestjs/common'

export const Utils = {
  genSaltedPassword: async (pw: string, iteration = 10) => {
    const salt = await bcrypt.genSalt(iteration)
    return bcrypt.hash(pw, salt)
  },
  ensure: (expr: any, errorObject: FuturePlayError | (() => FuturePlayError)): boolean => {
    if (!expr) {
      const futurePlayError: FuturePlayError = isFunction(errorObject) ? errorObject() : errorObject
      throw new HttpException(
        { message: futurePlayError.msg, code: futurePlayError.code, statusCode: futurePlayError.status },
        futurePlayError.status
      )
    }
    return expr
  },
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
