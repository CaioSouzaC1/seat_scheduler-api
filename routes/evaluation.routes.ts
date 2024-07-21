const EvaluationsController = () => import('#controllers/evaluations_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/', [EvaluationsController, 'index'])
    router.put('/:id', [EvaluationsController, 'edit'])
    router.get('/:id', [EvaluationsController, 'show'])
    router.delete('/:id', [EvaluationsController, 'delete'])

    router.post('/', [EvaluationsController, 'store'])
  })
  .prefix('evaluations')
  .use(middleware.auth())
