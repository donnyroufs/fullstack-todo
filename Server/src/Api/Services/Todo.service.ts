import { ITodoRepository } from '../../Types'
import { ITodoService } from 'core/Services'
import {
  CreateTodoRequestDto,
  RemoveTodoRequestDto,
  RemoveTodoResponseDto,
  ToggleTodoStatusRequestDto,
} from '../Dto'
import { TodoEntity } from '../../Data/Entities'
import CatchExceptionsWrapper from '@donnyroufs/browter/dist/CatchExceptionsWrapper'
import { raw } from 'express'

export class TodoService implements ITodoService {
  constructor(private readonly todoRepo: ITodoRepository) {}

  async getTodos(): Promise<TodoEntity[]> {
    return this.todoRepo.find()
  }

  async createTodo(payload: CreateTodoRequestDto) {
    return this.todoRepo.save(payload)
  }

  async toggleTodoStatus(payload: ToggleTodoStatusRequestDto) {
    const todo = await this.todoRepo.findOne(payload.id)

    if (!todo) {
      return null
    }

    todo.completed = !todo.completed

    return this.todoRepo.save(todo)
  }

  async removeTodo(payload: RemoveTodoResponseDto) {
    const result = await this.todoRepo.delete(payload.id)
    return !!result.affected
  }
}
