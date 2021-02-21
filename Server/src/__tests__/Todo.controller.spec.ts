// @ts-nocheck

import { TodoEntity } from '../Data/Entities'
import { app } from '../Bootstrap'

import { getRepository, getConnection } from 'typeorm'
import supertest from 'supertest'
import { bootServer } from './utils/bootServer'

const request = supertest(app.server)
const PREFIX = `/api/v${app.API_VERSION}`

function endpoint(endpoint: string) {
  return PREFIX + endpoint
}

const todo = {
  id: 1,
  title: 'Awesome todo',
  completed: false,
  createdAt: '2021-02-20T20:19:57.247Z',
  updatedAt: '2021-02-20T20:19:57.247Z',
}

let isRunning = false
bootServer(isRunning)

// @ts-ignore

describe('Todo Controller', () => {
  beforeAll((done) => {
    app.server.on('server-booted', async () => {
      const todoRepo = getRepository(TodoEntity)
      await todoRepo.save(todo)

      isRunning = true

      done()
    })
  })

  beforeEach(async (done) => {
    if (!isRunning) return done()

    await getConnection().synchronize(true)

    const todoRepo = getRepository(TodoEntity)
    await todoRepo.save(todo)

    done()
  })

  describe('Getting all todos', () => {
    it('Should answer with a 200 response', async (done) => {
      const res = await request.get(endpoint(`/todos`))

      expect(res.status).toBe(200)
      expect(res.body.statusCode).toBe(200)

      done()
    })

    it('Should give back an array with one todo', async (done) => {
      const res = await request.get(endpoint('/todos'))
      const { createdAt, updatedAt, ..._todo } = todo

      expect(res.body.data.length === 1).toBeTruthy()
      expect(res.body.data[0]).toMatchObject({ ..._todo })
      done()
    })
  })

  describe('Creating a single todo', () => {
    it('Should answer with a 201 response', async (done) => {
      const res = await request
        .post(endpoint('/todos'))
        .send({ ...todo, id: 2, title: 'awesome title' })

      expect(res.status).toBe(200)
      expect(res.body.statusCode).toBe(201)
      done()
    })

    it('Should create a new todo entity and store it in the persistence layer', async (done) => {
      await request
        .post(endpoint(`/todos`))
        .send({ ...todo, id: 2, title: 'crazy title' })

      const todoRepo = getRepository(TodoEntity)
      const createdTodo = await todoRepo.findOne({ title: 'crazy title' })

      expect(createdTodo).toBeDefined()
      expect(createdTodo.title).toBe('crazy title')
      done()
    })

    it('Should respond with a properly mapped Dto', async (done) => {
      const res = await request.post(endpoint('/todos')).send({ title: 'woef' })

      expect(Object.keys(res.body.data)).toEqual(['id', 'createdAt'])

      done()
    })
  })

  describe("Updating a todo's completed status by id", () => {
    it('Should answer with a 204 response', async (done) => {
      const res = await request.patch(endpoint(`/todos/${todo.id}`))

      expect(res.status).toBe(200)
      expect(res.body.statusCode).toBe(204)

      done()
    })

    it('Should answer with a 404 response when no todo found', async (done) => {
      const res = await request.patch(endpoint(`/todos/1337`))

      expect(res.status).toBe(200)
      expect(res.body.statusCode).toBe(404)

      done()
    })

    it('Should reverse the completed status of the found todo', async (done) => {
      const res = await request.patch(endpoint(`/todos/${todo.id}`))

      expect(res.body.data.completed).toBe(!todo.completed)
      done()
    })

    it('Should respond with a properly mapped Dto', async (done) => {
      const res = await request.patch(endpoint(`/todos/${todo.id}`))

      expect(Object.keys(res.body.data)).toEqual([
        'id',
        'completed',
        'updatedAt',
      ])
      done()
    })
  })

  describe('Deleting a single todo', () => {
    it('Should answer with a 204 response', async (done) => {
      const res = await request.delete(endpoint(`/todos/${todo.id}`))

      expect(res.status).toBe(200)
      expect(res.body.statusCode).toBe(204)
      done()
    })

    it('Should delete the given todo', async (done) => {
      await request.delete(endpoint(`/todos/${todo.id}`))

      const todoRepo = getRepository(TodoEntity)
      const deletedTodo = await todoRepo.findOne(todo.id)

      expect(deletedTodo).toBeUndefined()
      done()
    })

    it('Should respond with a properly mapped Dto', async (done) => {
      const res = await request.delete(endpoint(`/todos/${todo.id}`))

      expect(res.body.data).toBeNull()
      done()
    })
  })
})
