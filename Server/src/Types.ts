import { Repository } from 'typeorm'

import { TodoEntity } from './Data/Entities'
import { ITodoService } from 'core/Services'

export interface ICompositionRoot {
  todoService: ITodoService
}

export interface ITodoRepository extends Repository<TodoEntity> {}
