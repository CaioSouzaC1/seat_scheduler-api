import { EvaluationService } from '#services/evaluation_service'
import type { HttpContext } from '@adonisjs/core/http'
import ReturnApi from '../utils/return_api.js'
import {
  idEvaluationValidation,
  storeEvaluationValidation,
  updateEvaluationValidation,
} from '#validators/evaluation'
import { inject } from '@adonisjs/core'
import { errors } from '@vinejs/vine'

@inject()
export default class EvaluationsController {
  constructor(private evaluationService: EvaluationService) { }

  async store({ response, request, auth }: HttpContext) {
    try {
      const { note, storeId, description } = await request.validateUsing(storeEvaluationValidation)

      await this.evaluationService.store({ note, storeId, description, userId: auth.user!.id })

      return ReturnApi.success({
        response,
        code: 201,
        message: 'Obrigado pela avalição',
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
        message: 'Error ao registrar a avalição',
        code: 400,
      })
    }
  }

  async show({ response, request }: HttpContext) {
    try {
      const {
        params: { id },
      } = await request.validateUsing(idEvaluationValidation)

      const evaluation = await this.evaluationService.show({ evaluationId: id })

      return ReturnApi.success({
        response,
        data: evaluation,
        message: 'Avalição encontrada com sucesso',
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
        message: 'Error ao encontrar a avalição',
        code: 400,
      })
    }
  }

  async delete({ response, request }: HttpContext) {
    try {
      const {
        params: { id },
      } = await request.validateUsing(idEvaluationValidation)

      await this.evaluationService.delete({ evaluationId: id })

      return ReturnApi.success({
        response,
        message: 'Avalição deletada com sucesso',
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
        message: 'Error ao deletar a avalição',
        code: 400,
      })
    }
  }

  async edit({ response, request }: HttpContext) {
    try {
      const {
        params: { id },
        note,
        description,
      } = await request.validateUsing(updateEvaluationValidation)

      await this.evaluationService.update({ evaluationId: id, description, note })

      return ReturnApi.success({
        response,
        message: 'Avalição alterada com sucesso',
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
        message: 'Error ao alterar a avalição',
        code: 400,
      })
    }
  }

  async index({ request, response }: HttpContext) {
    try {
      const { limit, page } = request.qs()

      const evaluations = await this.evaluationService.index({ limit, page })

      return ReturnApi.success({
        response,
        data: evaluations,
        message: 'Lista de avaliações',
      })
    } catch {
      return ReturnApi.error({
        response,
        message: 'Error ao listar as avaliações',
        code: 400,
      })
    }
  }
}
