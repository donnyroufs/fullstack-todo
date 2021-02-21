import { IHttpResponseDto } from 'core/Dto'
import { Response } from 'express'
import { MapToDto } from './DtoMapper'

export class BaseHttpController {
  constructor() {
    this.autoBindMethods()
  }

  public json<T>(
    res: Response,
    { statusCode, error, data }: Partial<IHttpResponseDto<T>>
  ) {
    return res.json({
      statusCode: statusCode || 200,
      error: error || null,
      data: data || null,
    } as IHttpResponseDto<T>)
  }

  public toDto<T, D>(dto: T, data: D) {
    return MapToDto(dto, data) as T
  }

  protected autoBindMethods() {
    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this))

    methods
      .filter((method) => method !== 'constructor')
      .forEach((method) => {
        // @ts-ignore
        this[method] = this[method].bind(this)
      })
  }
}
