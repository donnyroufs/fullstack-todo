import { Exclude, Expose } from 'class-transformer'
import {
  ICreateTodoRequestDto,
  ICreateTodoResponseDto,
  IGetTodosResponseDto,
  IRemoveTodoRequestDto,
  IRemoveTodoResponseDto,
  IToggleTodoStatusRequestDto,
  IToggleTodoStatusResponseDto,
} from 'core/Dto/index'

export class GetTodosResponseDto implements IGetTodosResponseDto {
  @Expose()
  id: number

  @Expose()
  title: string

  @Expose()
  completed: boolean

  @Expose()
  createdAt: Date

  @Exclude()
  updatedAt: Date
}

export class CreateTodoRequestDto implements ICreateTodoRequestDto {
  @Expose()
  title: string
}

export class CreateTodoResponseDto implements ICreateTodoResponseDto {
  @Expose()
  id: number

  @Expose()
  createdAt: Date
}

export class ToggleTodoStatusRequestDto implements IToggleTodoStatusRequestDto {
  @Expose()
  id: number
}

export class ToggleTodoStatusResponseDto
  implements IToggleTodoStatusResponseDto {
  @Expose()
  id: number

  @Expose()
  completed: boolean

  @Expose()
  updatedAt: Date
}

export class RemoveTodoResponseDto implements IRemoveTodoRequestDto {
  @Expose()
  id: number
}

export class RemoveTodoRequestDto implements IRemoveTodoResponseDto {}

export type GetTodosResponseDtoType = typeof GetTodosResponseDto
export type CreateTodoRequestDtoType = typeof CreateTodoRequestDto
export type CreateTodoResponseDtoType = typeof CreateTodoResponseDto
export type ToggleTodoStatusRequestDtoType = typeof ToggleTodoStatusRequestDto
export type ToggleTodoStatusResponseDtoType = typeof ToggleTodoStatusResponseDto
export type RemoveTodoResponseDtoType = typeof RemoveTodoResponseDto
export type RemoveTodoRequestDtoType = typeof RemoveTodoRequestDto
