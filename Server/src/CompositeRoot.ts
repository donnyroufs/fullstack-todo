import { getRepository } from 'typeorm'

import { TodoService } from './Api/Services/Todo.service'
import { TodoEntity } from './Data/Entities'
import { ICompositionRoot, ITodoRepository } from './Types'

import { ITodoService } from 'core/Services'

function createCompositeRoot() {
  const todoRepository: ITodoRepository = getRepository(TodoEntity)
  const todoService: ITodoService = new TodoService(todoRepository)

  return {
    todoService,
  } as ICompositionRoot
}

export const { todoService } = createCompositeRoot()
