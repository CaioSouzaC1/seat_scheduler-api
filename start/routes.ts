/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { sep, normalize } from 'node:path'
import app from '@adonisjs/core/services/app'

import '../routes/user.routes.ts'
import '../routes/user_type.routes.ts'
import '../routes/session.routes.ts'
import '../routes/company.routes.ts'
import '../routes/store.routes.ts'
import '../routes/table.routes.ts'
import '../routes/booking.routes.ts'
import '../routes/order.routes.ts'
import '../routes/evaluation.routes.ts'
import '../routes/advert.routes.ts'
import '../routes/notification.routes.js'

import ws from '#services/ws'

router.get('/:id', async ({ response, params }) => {
  ws.io?.emit(`notify.${params.id}`, { message: 'Hello, World' })
  return response.send({ message: `send message to ${params.id}` })
})

const PATH_TRAVERSAL_REGEX = /(?:^|[\\/])\.\.(?:[\\/]|$)/

router.get('/uploads/*', ({ request, response }) => {
  const filePath = request.param('*').join(sep)
  const normalizedPath = normalize(filePath)

  if (PATH_TRAVERSAL_REGEX.test(normalizedPath)) {
    return response.badRequest('Malformed path')
  }

  const absolutePath = app.makePath('uploads', normalizedPath)
  return response.download(absolutePath)
})
