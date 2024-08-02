import type { HttpContext } from '@adonisjs/core/http'
import ReturnApi from '../utils/return_api.js'
import { errors } from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import { TableService } from '#services/table_service'
import {
  DeleteInBulkTableValidation,
  editTableValidation,
  idTableValidation,
  storeInBulkTableValidation,
  storeTableValidation,
} from '#validators/table'
import { idStoreValidation } from '#validators/store'

@inject()
export default class TablesController {
  constructor(private tableService: TableService) {}

  async storeInBulk({ response, request }: HttpContext) {
    try {
      const { numberOfTables, storeId, numberOfChairs, observation, status } =
        await request.validateUsing(storeInBulkTableValidation)

      const table = await this.tableService.storeInBulk({
        numberOfTables,
        storeId,
        numberOfChairs,
        observation,
        status,
      })

      return ReturnApi.success({
        response,
        data: table,
        code: 201,
        message: 'Mesas registradas com sucesso!',
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

  async edit({ request, response, auth }: HttpContext) {
    try {
      const {
        status,
        observation,
        numberOfChairs,
        number,
        params: { id },
      } = await request.validateUsing(editTableValidation, {
        meta: {
          userId: auth.user!.id,
        },
      })

      await this.tableService.edit({
        status,
        observation,
        numberOfChairs,
        number,
        tableId: id,
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

  async show({ request, response }: HttpContext) {
    try {
      const {
        params: { id },
      } = await request.validateUsing(idTableValidation)

      const table = await this.tableService.show({
        tableId: id,
      })

      return ReturnApi.success({
        response,
        data: table,
        message: 'Mesa encontrada com sucesso!',
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
        message: 'Error ao encontrar a mesa',
        code: 400,
      })
    }
  }

  async delete({ request, response }: HttpContext) {
    try {
      const {
        params: { id },
      } = await request.validateUsing(idTableValidation)

      await this.tableService.delete({
        tableId: id,
      })

      return ReturnApi.success({
        response,
        message: 'Mesa apagada com sucesso!',
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
        message: 'Error ao apagadar a mesa',
        code: 400,
      })
    }
  }

  async deleteInBulk({ request, response }: HttpContext) {
    try {
      const { storeId, tables } = await request.validateUsing(DeleteInBulkTableValidation)

      await this.tableService.deleteInBulk({
        storeId,
        tables,
      })

      return ReturnApi.success({
        response,
        message: 'Mesas apagadas com sucesso!',
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
        message: 'Error ao apagadar a mesa',
        code: 400,
      })
    }
  }

  async index({ response, request }: HttpContext) {
    try {
      const { limit, page } = request.qs()

      const {
        params: { id },
      } = await request.validateUsing(idStoreValidation)

      const tables = await this.tableService.index({ page, limit, id })

      return ReturnApi.success({
        response,
        data: tables,
        message: 'Lista das mesas!',
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
        message: 'Error ao listar a mesas',
        code: 400,
      })
    }
  }
}
