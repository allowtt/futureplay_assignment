import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value
    }

    // DTO의 클래스 인스턴스 생성
    const object = plainToClass(metatype, value)

    // 유효성 검사
    const errors = await validate(object)

    if (errors.length > 0) {
      // 에러 리스폰스 객체의 값을 변경합니다.
      const errorResponse = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: '유효성 검사 에러',
        code: 8888,
        errors: this.buildErrorObject(errors),
      }
      throw new HttpException(errorResponse, HttpStatus.BAD_REQUEST)
    }
    return value
  }

  private buildErrorObject(errors: any[]) {
    const result = {}
    errors.forEach((error) => {
      const prop = error.property
      Object.entries(error.constraints).forEach(([key, value]) => {
        // 에러 메시지에서 컨스트레인트 이름 제거하고, 프로퍼티 이름과 에러 메시지만 사용합니다.
        result[prop] = value
      })
    })
    return result
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private toValidate(metatype: Function): boolean {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const types: Function[] = [String, Boolean, Number, Array, Object]
    return !types.includes(metatype)
  }
}
