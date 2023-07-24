import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsEmail, IsString } from 'class-validator'

export class JoinRequestDto {
  @ApiProperty({
    example: 'qwerty@abc.com',
    description: 'email',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  public email: string

  @ApiProperty({
    example: 'test',
    description: 'name',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  public name: string

  @ApiProperty({
    example: 'test',
    description: 'password',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  public password: string
}

export class LoginRequestDto {
  @ApiProperty({
    example: 'test@gmail.com',
    description: '이메일',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  public email: string

  @ApiProperty({
    example: 'password1',
    description: '비밀번호',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  public password: string
}
