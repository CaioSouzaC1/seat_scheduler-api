import type { HttpContext } from '@adonisjs/core/http'
import ReturnApi from '../utils/return_api.js'
import { errors } from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import { TableService } from '#services/table_service'
import { editTableValidation, storeTableValidation } from '#validators/table_validation'

@inject()
export default class TablesController {
  constructor(private tableService: TableService) {}

  async store({ response, request }: HttpContext) {
    try {
      const { number, storeId, numberOfChairs, observation, status } =
        await request.validateUsing(storeTableValidation)

      const table = await this.tableService.store({
        number,
        storeId,
        numberOfChairs,
        observation,
        status,
      })

      return ReturnApi.success({
        response,
        data: table,
        code: 201,
        message: 'Mesa registrada com sucesso!',
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
        message: 'Error ao registrar a mesa',
        code: 400,
      })
    }
  }

  async edit({ request, response }: HttpContext) {
    try {
      const { status, observation, numberOfChairs, number, tableId } =
        await request.validateUsing(editTableValidation)

      await this.tableService.edit({
        status,
        observation,
        numberOfChairs,
        number,
        tableId,
      })

      return ReturnApi.success({
        response,
        message: 'Mesa atualizada com sucesso!',
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
        message: 'Error ao atualizar a mesa',
        code: 400,
      })
    }
  }
}

