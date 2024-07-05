const CompaniesController = () => import('#controllers/companies_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.post('/', [CompaniesController, 'store'])
    router.put('/:id', [CompaniesController, 'edit'])
    router.get('/:id', [CompaniesController, 'show'])
    router.delete('/:id', [CompaniesController, 'delete'])
  })
  .prefix('companies')
  .use(middleware.auth())

