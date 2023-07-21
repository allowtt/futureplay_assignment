import { ApiProperty } from '@nestjs/swagger'

export class JoinRequestDto {
  @ApiProperty({
    example: 'qwerty@abc.com',
    description: 'email',
    required: true,
  })
  public email: string

  @ApiProperty({
    example: 'test',
    description: 'name',
    required: true,
  })
  public name: string

  @ApiProperty({
    example: 'test',
    description: 'password',
    required: true,
  })
  public password: string
}
