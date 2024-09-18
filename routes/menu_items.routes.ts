const MenuItemController = () => import('#controllers/menu_item_controller')

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/', [MenuItemController, 'index'])
    router.post('/', [MenuItemController, 'store'])
    router.delete('/bulk', [MenuItemController, 'deleteInBulk'])
  })
  .prefix('menu-items')
  .middleware(middleware.auth())
