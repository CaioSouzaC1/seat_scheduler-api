/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import '../routes/user.routes.js'
import '../routes/user_type.routes.js'
import '../routes/session.routes.js'

router.get('/', async () => {
  return {
    message: 'hello, world',
  }
})
