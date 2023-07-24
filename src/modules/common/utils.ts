import moment from 'moment-timezone'
import { TIME_ZONE } from '../../config/server'
import bcrypt from 'bcryptjs'
import { ErrorMap, FuturePlayError } from './errors'
import _, { isFunction } from 'lodash'
import { HttpException } from '@nestjs/common'
import { Secret, sign, verify } from 'jsonwebtoken'

export const Utils = {
  genSaltedPassword: async (pw: string, iteration = 10) => {
    const salt = await bcrypt.genSalt(iteration)
    return bcrypt.hash(pw, salt)
  },
  checkSaltedPassword: async (pw: string, salted: string) => {
    return bcrypt.compare(pw, salted)
  },
  signJWT: async (payload: string | Buffer | object, secret: Secret): Promise<string> => {
    return new Promise((res) => {
      sign(payload, secret, { algorithm: 'HS256' }, (err, token) => {
        if (err) {
          Utils.ensure(false, ErrorMap.JWTVerificationError)
        } else {
          res(token!)
        }
      })
    })
  },
  verifyJWT: async (token: string, secret: string) => {
    return new Promise((res) => {
      verify(token, secret, (err, payload) => {
        if (err) {
          Utils.ensure(false, ErrorMap.JWTVerificationError)
        } else {
          res(payload)
        }
      })
    })
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
