import { ApiProperty } from '@nestjs/swagger'
export class PageRequest {
  @ApiProperty({ required: false })
  page?: number

  @ApiProperty({ required: false })
  pageSize?: number
}
