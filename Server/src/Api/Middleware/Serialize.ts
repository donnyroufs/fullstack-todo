import { NextFunction, Request } from 'express'
import { MapToDto } from '../../Lib/DtoMapper'

export function serialize(dto: any, type?: 'body' | 'query' | 'params') {
  return (req: Request, _: unknown, next: NextFunction) => {
    req.body = MapToDto(dto, req.body)
    next()
  }
}
