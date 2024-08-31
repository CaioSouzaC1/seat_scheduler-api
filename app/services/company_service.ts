import { inject } from '@adonisjs/core'
import {
  ICompanyIdRequest,
  IEditCompanyRequest,
  IStoreCompanyRequest,
} from '../interfaces/Requests/Company/index.js'
import { AddressService } from './address_service.js'
import Company from '#models/company'
import app from '@adonisjs/core/services/app'
import { cuid } from '@adonisjs/core/helpers'
import { IIndexRequest } from '../interfaces/ReturnApi/index.js'

@inject()
export class CompanyService {
  constructor(private addressService: AddressService) {}

  async store({
    cnpj,
    name,
    address: { cep, city, state, number, street, country, complement, neighborhood },
    images,
    userId,
  }: IStoreCompanyRequest) {
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

    const company = await Company.create({
      name,
      cnpj,
      userId,
      addressId: address.id,
    })

    if (images) {
      for (const image of images) {
        await image.move(app.makePath('uploads/companies'), {
          name: `${cuid()}.${image.extname}`,
        })

        await company
          .related('attachement')
          .create({ imagePath: '/uploads/companies/' + image.fileName })
      }
    }

    await company.related('address').associate(address)

    return company
  }

  async update({
    companyId,
    name,
    cnpj,
    userId,
    address: { neighborhood, complement, country, street, number, state, city, cep },
    images,
  }: IEditCompanyRequest) {
    const company = await Company.findBy({ user_id: userId, id: companyId })

    if (!company) return null

    if (company.addressId)
      await this.addressService.update({
        addressId: company.addressId,
        cep,
        city,
        state,
        number,
        street,
        country,
        complement,
        neighborhood,
      })

    if (images) {
      for (const image of images) {
        await image.move(app.makePath('uploads/companies'), {
          name: `${cuid()}.${image.extname}`,
        })

        await company
          .related('attachement')
          .updateOrCreate(
            { companyId: company.id },
            { imagePath: '/uploads/companies/' + image.fileName }
          )
      }
    }

    company.name = name ?? company.name
    company.cnpj = cnpj ?? company.cnpj

    await company.save()
  }

  async delete({ companyId, userId }: ICompanyIdRequest) {
    const company = await Company.findBy({ id: companyId, user_id: userId })

    await company!.delete()
  }

  async show({ companyId, userId }: ICompanyIdRequest) {
    const company = await Company.query()
      .preload('attachement')
      .preload('user')
      .preload('advert')
      .preload('address')
      .where({ id: companyId, user_id: userId })
      .first()

    return company
  }

  async index({ page, limit, id: userId }: IIndexRequest) {
    const companies = await Company.query()
      .preload('attachement')
      .preload('user')
      .preload('advert')
      .preload('address')
      .whereHas('user', (userQuery) => {
        userQuery.where('id', userId!)
      })
      .paginate(page, limit)

    return companies.toJSON()
  }
}
