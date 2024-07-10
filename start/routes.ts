/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

import '../routes/user.routes.ts'
import '../routes/user_type.routes.ts'
import '../routes/session.routes.ts'
import '../routes/company.routes.ts'
import '../routes/store.routes.ts'
import '../routes/table.routes.ts'
import '../routes/booking.routes.ts'

router.get('/', async () => {
  return {
    message: 'hello, world',
  }
})
