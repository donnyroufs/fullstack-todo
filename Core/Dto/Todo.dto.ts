import { ITodoEntity } from '../Entities'

export interface IGetTodosResponseDto extends Omit<ITodoEntity, 'updatedAt'> {}

export interface ICreateTodoRequestDto
  extends Omit<ITodoEntity, 'updatedAt' | 'createdAt' | 'id' | 'completed'> {}

export interface ICreateTodoResponseDto
  extends Omit<ITodoEntity, 'updatedAt' | 'completed' | 'title'> {}

export interface IToggleTodoStatusRequestDto
  extends Omit<
    ITodoEntity,
    'updatedAt' | 'completed' | 'title' | 'createdAt'
  > {}

export interface IToggleTodoStatusResponseDto
  extends Omit<ITodoEntity, 'title' | 'createdAt'> {}

export interface IRemoveTodoRequestDto
  extends Omit<
    ITodoEntity,
    'updatedAt' | 'completed' | 'title' | 'createdAt'
  > {}

export interface IRemoveTodoResponseDto {}
