import { BeforeInsert, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'
import { FuturePlayEntity } from 'src/modules/common/entities/FuturePlayEntity'
import { Utils } from 'src/modules/common/utils'
import { USER_ROLE } from '../users.const'

@Index('email', ['email'], { unique: true })
@Entity()
export class Users extends FuturePlayEntity {
  @PrimaryGeneratedColumn({ comment: '유저아이디' })
  readonly userId!: number

  @Column({ type: 'varchar', comment: '로그인용 이메일 주소', length: 140 })
  email: string

  @Column('varchar', { comment: '이름', length: 30 })
  name: string

  @Column({ comment: 'Salted Password' })
  password!: string

  @Column({ comment: '권한', default: USER_ROLE.user })
  role!: number

  @Column({ comment: '마지막 접속 날짜 토큰 (YYYY-MM-DD)', nullable: false, length: 10 })
  lastLoginToken!: string

  @Column('timestamp', { comment: '마지막 접속 시각', nullable: false })
  lastAccessTime!: Date

  @BeforeInsert()
  updateLastLoginToken() {
    this.lastLoginToken = Utils.getNowDateToken()
  }

  @BeforeInsert()
  updateLastAccessTime() {
    this.lastAccessTime = Utils.getNowDate()
  }
}
