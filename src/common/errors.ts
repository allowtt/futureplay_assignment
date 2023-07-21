export interface FuturePlayError {
  code: number
  status: number
  msg: string
}

export const ErrorMap = {
  DuplicateUser: { code: 1, status: 400, msg: `이미 사용중인 이메일입니다.` },

  UnknownError: (msg = '예기치 않은 오류가 발생하였습니다.') => ({
    code: 9999,
    status: 500,
    msg,
  }),
}
