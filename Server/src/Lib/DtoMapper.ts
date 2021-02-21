import { plainToClass } from 'class-transformer'

export function mapper<T>(dto: any, data: object) {
  return plainToClass<T, object>(dto, data, { excludeExtraneousValues: true })
}

export function MapToDto(dto: any, data: any) {
  let _data: any

  if (Array.isArray(data)) {
    _data = data.map((item) => mapper(dto, item))
  } else {
    _data = mapper(dto, data)
  }

  return _data
}
