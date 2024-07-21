const AdvertsController = () => import('#controllers/adverts_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/:id', [AdvertsController, 'show'])
    router.delete('/:id', [AdvertsController, 'delete'])
    router.put('/:id', [AdvertsController, 'edit'])

    router.post('/', [AdvertsController, 'store'])
    router.get('/', [AdvertsController, 'index'])
  })
  .use(middleware.auth())
  .prefix('adverts')
