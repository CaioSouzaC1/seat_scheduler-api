import factory from '@adonisjs/lucid/factories'
import Advert from '#models/advert'

export const AdvertFactory = factory
  .define(Advert, async ({ faker }) => {
    return {}
  })
  .build()