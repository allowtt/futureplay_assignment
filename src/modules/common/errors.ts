export interface FuturePlayError {
  code: number
  status: number
  msg: string
}

export const ErrorMap = {
  DuplicateUser: { code: 1, status: 400, msg: `이미 사용중인 이메일입니다.` },

  WrongLoginInfo: { code: 2, status: 400, msg: `존재하지 않는 이메일입니다.` },

  NotMatchPassword: { code: 3, status: 400, msg: `비밀번호가 틀렸습니다.` },
  JWTVerificationError: {
    code: 4,
    status: 500,
    msg: '토큰을 확인하는 동안 오류가 발생했습니다. 토큰이 올바른 형식인지 확인하십시오.',
  },
  NoPrivilege: { code: 5, status: 403, msg: `권한이 없습니다.` },

  UnknownError: (msg = '예기치 않은 오류가 발생하였습니다.') => ({
    code: 9999,
    status: 500,
    msg,
  }),
}
