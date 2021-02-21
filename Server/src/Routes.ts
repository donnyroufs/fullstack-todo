import '@donnyroufs/browter'

import { Router } from 'express'
import * as Todo from './Api/Serializers'

const router = Router()

router.group('/todos', (router) => {
  const { storeSerializer, updateSerializer } = Todo

  router.get('/', 'TodoController.index')
  router.post('/', 'TodoController.store', [storeSerializer])
  router.patch('/:id', 'TodoController.update', [updateSerializer])
  router.delete('/:id', 'TodoController.destroy')
})

export default router
