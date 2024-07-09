import { inject } from '@adonisjs/core'
import {
  ICompanyId,
  IEditCompanyRequest,
  IStoreCompanyRequest,
} from '../interfaces/Requests/Company/index.js'
import { AddressService } from './address_service.js'
import Company from '#models/company'

@inject()
export class CompanyService {
  constructor(private addressService: AddressService) {}

  async store({
    cep,
    city,
    cnpj,
    name,
    state,
    number,
    street,
    userId,
    country,
    complement,
    neighborhood,
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
    })

    await company.related('address').associate(address)

    return company
  }

  async update({
    companyId,
    name,
    cnpj,
    userId,
    neighborhood,
    complement,
    country,
    street,
    number,
    state,
    city,
    cep,
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

    company.name = name ?? company.name
    company.cnpj = cnpj ?? company.cnpj

    await company.save()
  }

  async delete({ companyId, userId }: ICompanyId) {
    const company = await Company.findBy({ id: companyId, user_id: userId })

    await company!.delete()
  }

  async show({ companyId, userId }: ICompanyId) {
    const company = await Company.findBy({ id: companyId, user_id: userId })

    return company
  }

  async index(id: string) {
    const companies = await Company.findManyBy({ user_id: id })

    const companiesJson = companies.map((company) => company.serialize())

    return companiesJson
  }
}
