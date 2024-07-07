import { StoreService } from '#services/store_service'
import { editStoreValidation, idStoreValidation, storeStoreValidation } from '#validators/store'
import type { HttpContext } from '@adonisjs/core/http'
import ReturnApi from '../utils/return_api.js'
import { errors } from '@vinejs/vine'
import { AddressService } from '#services/address_service'
import { inject } from '@adonisjs/core'
import { StoreAttachementService } from '#services/store_attachement_service'

@inject()
export default class StoresController {
  constructor(
    private storeService: StoreService,
    private storeAttachementService: StoreAttachementService,
    private addressService: AddressService
  ) {}

  async store({ request, response }: HttpContext) {
    try {
      const {
        name,
        phone,
        description,
        cep,
        city,
        state,
        companyId,
        number,
        street,
        country,
        complement,
        neighborhood,
        imagePath,
        attachments,
      } = await request.validateUsing(storeStoreValidation)

      const address = await this.addressService.store({
        cep,
        city,
        state,
        number,
        street,
        country,
        complement,
        neighborhood,
      })

      const store = await this.storeService.store({
        name,
        phone,
        description,
        companyId,
      })

      if (attachments) {
        await this.storeAttachementService.store(store, {
          imagePath: imagePath!,
          type: attachments.type,
          name: attachments.name,
        })
      }

      await store.related('address').associate(address)

      await store.related('attach').create({})

      return ReturnApi.success({
        response,
        data: store,
        code: 201,
        message: 'Loja criado com sucesso!',
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
      console.log(err)
      return ReturnApi.error({
        response,
        message: 'Error ao criar a loja',
        code: 400,
      })
    }
  }

  async edit({ response, request }: HttpContext) {
    try {
      const {
        cep,
        companyId,
        description,
        city,
        name,
        phone,
        state,
        number,
        street,
        country,
        complement,
        params: { id: storeId },
        neighborhood,
      } = await request.validateUsing(editStoreValidation)

      const store = await this.storeService.update({
        storeId,
        companyId,
        name,
        phone,
        description,
      })

      await this.addressService.update({
        addressId: store!.addressId,
        cep,
        city,
        state,
        number,
        street,
        country,
        complement,
        neighborhood,
      })

      return ReturnApi.success({
        response,
        message: 'Loja atualizada com sucesso!',
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
        message: 'Error ao atualizar a loja',
        code: 400,
      })
    }
  }

  async delete({ request, response }: HttpContext) {
    try {
      const {
        params: { id },
      } = await request.validateUsing(idStoreValidation)

      await this.storeService.delete({ storeId: id })

      return ReturnApi.success({
        response,
        message: 'Loja deletado com sucesso!',
      })
    } catch {
      return ReturnApi.error({
        response,
        message: 'Error ao atualizar o loja',
        code: 400,
      })
    }
  }

  async index({ response }: HttpContext) {
    try {
      const stores = await this.storeService.index()

      return ReturnApi.success({
        response,
        data: stores,
        message: 'Lista de loja!',
      })
    } catch {
      return ReturnApi.error({
        response,
        message: 'Error ao listar as lojas',
        code: 400,
      })
    }
  }
}
