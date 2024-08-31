const StoresController = () => import('#controllers/stores_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/owns', [StoresController, 'ownIndex'])

    router.put('/:id', [StoresController, 'edit'])
    router.delete('/:id', [StoresController, 'delete'])
    router.get('/:id', [StoresController, 'show'])

    router.get('/', [StoresController, 'index'])
    router.post('/', [StoresController, 'store'])
  })
  .prefix('stores')
  .middleware(middleware.auth())
