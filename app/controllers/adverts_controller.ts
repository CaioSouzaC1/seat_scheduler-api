import { type HttpContext } from '@adonisjs/core/http'
import ReturnApi from '../utils/return_api.js'
import { errors } from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import { AdvertService } from '#services/advert_service'
import { editAdvertValidation, idAdvertValidation, storeAdvertValidation } from '#validators/advert'

@inject()
export default class AdvertsController {
  constructor(private adverService: AdvertService) {}

  async store({ response, request, auth }: HttpContext) {
    try {
      const { name, type, images, storeId } = await request.validateUsing(storeAdvertValidation)

      await this.adverService.store({
        name,
        type,
        images,
        companyId: auth.user!.company.id,
        storeId,
      })

      return ReturnApi.success({
        response,
        code: 201,
        message: 'Anúncio criado com sucesso',
      })
    } catch (err) {
      if (err instanceof errors.E_VALIDATION_ERROR) {
        return ReturnApi.error({
          response,
          message: err.message,
          data: err.messages,
          code: 400,
        })
      }
      return ReturnApi.error({
        response,
        message: 'Error ao criar o anúncio',
        code: 400,
      })
    }
  }

  async show({ response, request }: HttpContext) {
    try {
      const {
        params: { id },
      } = await request.validateUsing(idAdvertValidation)

      const advert = await this.adverService.show({ advertId: id })

      return ReturnApi.success({
        response,
        data: advert,
        message: 'Anúncio encontrado com sucesso',
      })
    } catch (err) {
      if (err instanceof errors.E_VALIDATION_ERROR) {
        return ReturnApi.error({
          response,
          message: err.message,
          data: err.messages,
          code: 400,
        })
      }

      return ReturnApi.error({
        response,
        message: 'Error ao encontrar o anúncio',
        code: 400,
      })
    }
  }

  async delete({ response, request }: HttpContext) {
    try {
      const {
        params: { id },
      } = await request.validateUsing(idAdvertValidation)

      await this.adverService.delete({ advertId: id })

      return ReturnApi.success({
        response,
        message: 'Anúncio deletado com sucesso',
      })
    } catch (err) {
      if (err instanceof errors.E_VALIDATION_ERROR) {
        return ReturnApi.error({
          response,
          message: err.message,
          data: err.messages,
          code: 400,
        })
      }

      return ReturnApi.error({
        response,
        message: 'Error ao deletar o anúncio',
        code: 400,
      })
    }
  }

  async edit({ response, request }: HttpContext) {
    try {
      const {
        params: { id },
        name,
        images,
        type,
      } = await request.validateUsing(editAdvertValidation)

      await this.adverService.update({
        advertId: id,
        name,
        images,
        type,
      })

      return ReturnApi.success({
        response,
        message: 'Anúncio alterado com sucesso',
      })
    } catch (err) {
      if (err instanceof errors.E_VALIDATION_ERROR) {
        return ReturnApi.error({
          response,
          message: err.message,
          data: err.messages,
          code: 400,
        })
      }

      return ReturnApi.error({
        response,
        message: 'Error ao alterar o anúncio',
        code: 400,
      })
    }
  }

  async index({ request, response }: HttpContext) {
    try {
      const { limit, page } = request.qs()

      const adverts = await this.adverService.index({ page, limit })

      return ReturnApi.success({
        response,
        data: adverts,
        message: 'Lista de anúncios',
      })
    } catch {
      return ReturnApi.error({
        response,
        message: 'Error ao listar as anúncios',
        code: 400,
      })
    }
  }

  async ownIndex({ request, response, auth }: HttpContext) {
    try {
      const { limit, page } = request.qs()

      const storeIds = auth.user?.store.map((store) => store.id)
      const adverts = await this.adverService.myOwn({ page, limit, ids: storeIds })

      return ReturnApi.success({
        response,
        data: adverts,
        message: 'Lista de anúncios',
      })
    } catch (e) {
      console.log(e)
      return ReturnApi.error({
        response,
        message: 'Error ao listar as anúncios',
        code: 400,
      })
    }
  }
}
