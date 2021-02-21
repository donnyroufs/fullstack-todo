export * from './Todo.dto'

export interface IHttpResponseDto<T = unknown> {
  statusCode: number
  data: T
  error: string | null
}

export class HttpResponseDto<T> implements IHttpResponseDto {
  statusCode: number
  data: T
  error: string | null
}
