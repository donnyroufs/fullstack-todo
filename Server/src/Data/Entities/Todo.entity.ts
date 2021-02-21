import { ITodoEntity } from 'core/Entities'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm'

@Entity({ name: 'todos' })
export class TodoEntity implements ITodoEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    nullable: false,
    unique: true,
  })
  title: string

  @Column({
    default: false,
    nullable: false,
  })
  completed: boolean

  @CreateDateColumn()
  createdAt: Date

  @CreateDateColumn()
  updatedAt: Date
}
