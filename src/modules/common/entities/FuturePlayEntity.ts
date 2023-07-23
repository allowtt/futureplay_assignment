import { BeforeInsert, BeforeUpdate, Column } from 'typeorm'
import { Utils } from '../utils'

export class FuturePlayEntity {
  @Column({ type: 'timestamp', comment: '생성 시각' })
  createdAt!: Date

  @Column({ type: 'timestamp', comment: '업데이트 시각' })
  updatedAt!: Date

  @BeforeInsert()
  updateDatesForInsert() {
    const now = Utils.getNowDate()
    this.createdAt = now
    this.updatedAt = now
  }

  @BeforeUpdate()
  updateDatesForUpdate() {
    this.updatedAt = Utils.getNowDate()
  }
}
