import { Browter } from '@donnyroufs/browter'

import * as Todo from './Api/Serializers'

const browter = new Browter()

browter.group('/todos', (browter) => {
  const { storeSerializer, updateSerializer } = Todo

  browter.get('/', 'TodoController.index')
  browter.post('/', 'TodoController.store', [storeSerializer])
  browter.patch('/:id', 'TodoController.update', [updateSerializer])
  browter.delete('/:id', 'TodoController.destroy')
})

export default browter.build()
