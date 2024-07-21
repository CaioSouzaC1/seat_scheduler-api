import Evaluation from '#models/evaluation'
import { makeAddress } from '#tests/utils/factories/make_address'
import { makeCompany } from '#tests/utils/factories/make_company'
import { makeEvaluation } from '#tests/utils/factories/make_evaluation'
import { makeStore } from '#tests/utils/factories/make_store'
import { makeUser } from '#tests/utils/factories/make_user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Evaluation test', (group) => {
  group.each.setup(() => testUtils.db().migrate())

  test('[POST] /evaluations', async ({ client, assert }) => {
    const user = await makeUser({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const address = await makeAddress()

    await makeCompany({
      name: 'company',
      userId: user.id,
      addressId: address.id,
    })

    const store = await makeStore()

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const body = {
      note: 10,
      description: 'description',
      storeId: store.id,
    }

    const result = await client.post('/evaluations').json(body).bearerToken(token)

    result.assertStatus(201)

    const evaluationOnDatabase = Evaluation.first()

    assert.isOk(evaluationOnDatabase)
  })

  test('[GET] /evaluations/:id', async ({ client }) => {
    const user = await makeUser({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const address = await makeAddress()

    await makeCompany({
      name: 'company',
      userId: user.id,
      addressId: address.id,
    })

    const store = await makeStore()

    const evaluation = await makeEvaluation({ storeId: store.id, userId: user.id })

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const result = await client.get(`/evaluations/${evaluation.id}`).bearerToken(token)

    result.assertStatus(200)

    result.assertBodyContains({
      data: {
        id: String,
      },
    })
  })

  test('[DELETE] /evaluations/:id', async ({ assert, client }) => {
    const user = await makeUser({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const address = await makeAddress()

    await makeCompany({
      name: 'company',
      userId: user.id,
      addressId: address.id,
    })

    const store = await makeStore()

    const evaluation = await makeEvaluation({ storeId: store.id, userId: user.id })

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const result = await client.delete(`/evaluations/${evaluation.id}`).bearerToken(token)

    result.assertStatus(200)

    const EvaluationOndatabase = await Evaluation.first()

    assert.isNull(EvaluationOndatabase)
  })

  test('[PUT] /evaluations/:id', async ({ assert, client }) => {
    const user = await makeUser({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const address = await makeAddress()

    await makeCompany({
      name: 'company',
      userId: user.id,
      addressId: address.id,
    })

    const store = await makeStore()

    const evaluation = await makeEvaluation({ storeId: store.id, userId: user.id })

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const body = {
      note: 4,
      description: 'description',
    }

    const result = await client.put(`/evaluations/${evaluation.id}`).json(body).bearerToken(token)

    result.assertStatus(200)

    const evaluationOndatabase = await Evaluation.find(evaluation.id)

    assert.equal(evaluationOndatabase?.note, 4)
  })

  test('[GET] /evaluations', async ({ client }) => {
    const user = await makeUser({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const address = await makeAddress()

    await makeCompany({
      name: 'company',
      userId: user.id,
      addressId: address.id,
    })

    const store = await makeStore()

    await makeEvaluation({ storeId: store.id, userId: user.id })
    await makeEvaluation({ storeId: store.id, userId: user.id })

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const result = await client.get(`/evaluations/`).bearerToken(token)

    result.assertStatus(200)

    result.assertBodyContains({
      data: [
        {
          id: String,
        },
      ],
    })
  })
})
