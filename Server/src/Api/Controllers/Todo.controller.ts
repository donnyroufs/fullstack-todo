import { Request, Response } from 'express'

import { ITodoService } from 'core/Services'
import { todoService } from '../../CompositeRoot'
import { BaseHttpController } from '../../Lib/BaseHttpController'
import {
  CreateTodoResponseDto,
  CreateTodoResponseDtoType,
  GetTodosResponseDto,
  GetTodosResponseDtoType,
  RemoveTodoResponseDtoType,
  ToggleTodoStatusResponseDto,
  ToggleTodoStatusResponseDtoType,
} from '../Dto'

class TodoController extends BaseHttpController {
  private readonly todoService: ITodoService = todoService

  async index(req: Request, res: Response) {
    const todos = await this.todoService.getTodos()

    const data = this.toDto<GetTodosResponseDtoType, typeof todos>(
      GetTodosResponseDto,
      todos
    )

    this.json<GetTodosResponseDtoType>(res, {
      data,
    })
  }

  async store(req: Request, res: Response) {
    const createdTodo = await this.todoService.createTodo(req.body)

    const data = this.toDto<CreateTodoResponseDtoType, typeof createdTodo>(
      CreateTodoResponseDto,
      createdTodo
    )

    this.json<CreateTodoResponseDtoType>(res, {
      statusCode: 201,
      data,
    })
  }

  async update(req: Request & { params: { id: string } }, res: Response) {
    const updatedTodo = await this.todoService.toggleTodoStatus({
      id: Number.parseInt(req.params.id),
    })

    const data = this.toDto<
      ToggleTodoStatusResponseDtoType,
      typeof updatedTodo
    >(ToggleTodoStatusResponseDto, updatedTodo)

    const statusCode = data ? 204 : 404

    this.json<ToggleTodoStatusResponseDtoType>(res, {
      statusCode,
      data,
    })
  }

  async destroy(req: Request & { params: { id: string } }, res: Response) {
    const success = await this.todoService.removeTodo({
      id: Number.parseInt(req.params.id),
    })

    const statusCode = success ? 204 : 404

    this.json<RemoveTodoResponseDtoType>(res, {
      statusCode,
    })
  }
}

export const todoController = new TodoController()
