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

  NotFoundQuestionnaire: { code: 6, status: 400, msg: `설문지 아이디에 맞는 데이터가 존재하지 않습니다.` },
  DuplicateQuestionnaireTitle: { code: 7, status: 400, msg: `중복된 타이틀명이 존재합니다.` },
  NotFoundQuestionnaireContent: { code: 8, status: 400, msg: `설문지 내용아이디에 맞는 데이터가 존재하지 않습니다.` },
  DuplicateQuestionnaireUserResult: {
    code: 9,
    status: 400,
    msg: `이미 작성한 항목입니다.`,
  },
  UnknownError: (msg = '예기치 않은 오류가 발생하였습니다.') => ({
    code: 9999,
    status: 500,
    msg,
  }),
}
