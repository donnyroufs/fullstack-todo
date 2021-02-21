import { serialize } from '../Middleware/index'
import { CreateTodoRequestDto, ToggleTodoStatusRequestDto } from '../Dto'

export const storeSerializer = serialize(CreateTodoRequestDto)
export const updateSerializer = serialize(ToggleTodoStatusRequestDto)
