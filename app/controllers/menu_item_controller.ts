import type { HttpContext } from '@adonisjs/core/http'
import ReturnApi from '../utils/return_api.js'
import { errors } from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import { editTableValidation, idTableValidation } from '#validators/table'
import { MenuItemService } from '#services/menu_item_service'
import {
  DeleteInBulkMenuItemsValidation,
  indexMenuItemValidation,
  storeMenuItemValidation,
} from '#validators/menu_item'

@inject()
export default class MenuItemController {
  constructor(private menuItemService: MenuItemService) {}

  async store({ response, request }: HttpContext) {
    try {
      const { name, storeId, description, price } =
        await request.validateUsing(storeMenuItemValidation)

      const menuItem = await this.menuItemService.store({
        name,
        storeId,
        description,
        price,
      })

      return ReturnApi.success({
        response,
        data: menuItem,
        code: 201,
        message: 'Item registrado com sucesso!',
      })
    } catch (err) {
      console.error(err)
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
        message: 'Error ao registrar a Item',
        code: 400,
      })
    }
  }

  // async edit({ request, response, auth }: HttpContext) {
  //   try {
  //     const {
  //       status,
  //       observation,
  //       numberOfChairs,
  //       number,
  //       params: { id },
  //     } = await request.validateUsing(editTableValidation, {
  //       meta: {
  //         userId: auth.user!.id,
  //       },
  //     })

  //     await this.tableService.edit({
  //       status,
  //       observation,
  //       numberOfChairs,
  //       number,
  //       tableId: id,
  //     })

  //     return ReturnApi.success({
  //       response,
  //       message: 'Mesa atualizada com sucesso!',
  //     })
  //   } catch (err) {
  //     if (err instanceof errors.E_VALIDATION_ERROR) {
  //       return ReturnApi.error({
  //         response,
  //         message: err.message,
  //         data: err.messages,
  //         code: 400,
  //       })
  //     }
  //     return ReturnApi.error({
  //       response,
  //       message: 'Error ao atualizar a mesa',
  //       code: 400,
  //     })
  //   }
  // }

  // async delete({ request, response }: HttpContext) {
  //   try {
  //     const {
  //       params: { id },
  //     } = await request.validateUsing(idTableValidation)

  //     await this.tableService.delete({
  //       tableId: id,
  //     })

  //     return ReturnApi.success({
  //       response,
  //       message: 'Mesa apagada com sucesso!',
  //     })
  //   } catch (err) {
  //     if (err instanceof errors.E_VALIDATION_ERROR) {
  //       return ReturnApi.error({
  //         response,
  //         message: err.message,
  //         data: err.messages,
  //         code: 400,
  //       })
  //     }
  //     return ReturnApi.error({
  //       response,
  //       message: 'Error ao apagadar a mesa',
  //       code: 400,
  //     })
  //   }
  // }

  async deleteInBulk({ request, response }: HttpContext) {
    try {
      const { storeId, menuItems } = await request.validateUsing(DeleteInBulkMenuItemsValidation)

      await this.menuItemService.deleteInBulk({
        storeId,
        menuItems,
      })

      return ReturnApi.success({
        response,
        message: 'Items apagadas com sucesso!',
      })
    } catch (err) {
      console.log(err)
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
        message: 'Error ao apagar os items',
        code: 400,
      })
    }
  }

  async index({ response, request }: HttpContext) {
    try {
      const { limit, page, search, storeId } = await request.validateUsing(indexMenuItemValidation)

      const tables = await this.menuItemService.index({ limit, page, search, storeId })

      return ReturnApi.success({
        response,
        data: tables,
        message: 'Lista dos items!',
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
        message: 'Error ao listar a items',
        code: 400,
      })
    }
  }
}
