const TablesController = () => import('#controllers/tables_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/:id/all', [TablesController, 'index'])
    router.get('/:id', [TablesController, 'show'])
    router.put('/:id', [TablesController, 'edit'])
    router.delete('/:id', [TablesController, 'delete'])

    router.post('/', [TablesController, 'store'])
  })
  .prefix('tables')
  .middleware(middleware.auth())
