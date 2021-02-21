import {
  ICreateTodoRequestDto,
  IRemoveTodoRequestDto,
  IToggleTodoStatusRequestDto,
} from '../Dto'
import { ITodoEntity } from '../Entities'

export interface ITodoService {
  getTodos(): Promise<ITodoEntity[]>
  createTodo(payload: ICreateTodoRequestDto): Promise<ITodoEntity>
  toggleTodoStatus(
    payload: IToggleTodoStatusRequestDto
  ): Promise<ITodoEntity | null>
  removeTodo(payload: IRemoveTodoRequestDto): Promise<boolean>
}
