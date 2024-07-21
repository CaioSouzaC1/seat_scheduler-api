import { CompanyService } from '#services/company_service'
import {
  editCompanyValidation,
  storeCompanyValidation,
  idCompanyValidation,
} from '#validators/company'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import ReturnApi from '../utils/return_api.js'
import { errors } from '@vinejs/vine'

@inject()
export default class CompaniesController {
  constructor(private companyService: CompanyService) {}

  async index({ response, auth }: HttpContext) {
    try {
      const companies = await this.companyService.index(auth.user!.id)

      return ReturnApi.success({
        response,
        data: companies,
        message: 'Lista das empresas!',
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
        message: 'Error ao listar a empresa',
        code: 400,
      })
    }
  }

  async store({ response, request, auth }: HttpContext) {
    try {
      const {
        cep,
        city,
        cnpj,
        name,
        state,
        number,
        street,
        country,
        complement,
        neighborhood,
        images,
      } = await request.validateUsing(storeCompanyValidation)

      const company = await this.companyService.store({
        images,
        address: {
          complement,
          neighborhood,
          country,
          street,
          number,
          state,
          city,
          cep,
        },
        name,
        cnpj,
        userId: auth.user!.id,
      })

      return ReturnApi.success({
        response,
        data: company,
        code: 201,
        message: 'Empresa criada com sucesso!',
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
        message: 'Error ao criar a empresa',
        code: 400,
      })
    }
  }

  async edit({ response, request, auth }: HttpContext) {
    try {
      const {
        cnpj,
        name,
        cep,
        city,
        state,
        number,
        street,
        country,
        complement,
        neighborhood,
        images,
        params: { id },
      } = await request.validateUsing(editCompanyValidation)

      await this.companyService.update({
        images,
        address: {
          neighborhood,
          complement,
          country,
          street,
          number,
          state,
          city,
          cep,
        },
        companyId: id,
        cnpj,
        name,
        userId: auth.user!.id,
      })

      return ReturnApi.success({
        response,
        message: 'Empresa atualizada com sucesso!',
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
        message: 'Error ao atualizar a empresa',
        code: 400,
      })
    }
  }

  async delete({ request, response, auth }: HttpContext) {
    try {
      const {
        params: { id },
      } = await request.validateUsing(idCompanyValidation)

      await this.companyService.delete({ companyId: id, userId: auth.user!.id })

      return ReturnApi.success({
        response,
        message: 'Empresa deletada com sucesso!',
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
        message: 'Error ao deletar a empresa',
        code: 400,
      })
    }
  }

  async show({ request, response, auth }: HttpContext) {
    try {
      const {
        params: { id },
      } = await request.validateUsing(idCompanyValidation)

      const company = await this.companyService.show({ companyId: id, userId: auth.user!.id })

      return ReturnApi.success({
        response,
        data: company,
        message: 'Empresa encontrada com sucesso!',
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
        message: 'Error ao encontrar a empresa',
        code: 400,
      })
    }
  }
}
