import { SelectQueryBuilder } from 'typeorm'
import { PageRequest } from './common.pageRequest'

export async function ListableOutput(qb: SelectQueryBuilder<any>, data: PageRequest) {
  if (data.page || data.pageSize) {
    const skip = (data.page - 1) * data.pageSize
    const pageSize = data.pageSize
    const [list, totalCount] = await qb.skip(skip).take(pageSize).getManyAndCount()
    const totalPage = Math.ceil(totalCount / pageSize)
    return { list, page: Number(data.page), pageSize: Number(data.pageSize), totalCount, totalPage }
  } else {
    const [list, totalCount] = await qb.getManyAndCount()
    return { list, totalCount }
  }
}
