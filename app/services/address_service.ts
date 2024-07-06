import Address from '#models/address'
import { IEditAddressRequest, IStoreAddressRequest } from '../interfaces/Requests/Address/index.js'

export class AddressService {
  async store({
    neighborhood,
    complement,
    country,
    street,
    number,
    state,
    city,
    cep,
  }: IStoreAddressRequest) {
    const address = await Address.create({
      neighborhood,
      complement,
      country,
      street,
      number,
      state,
      city,
      cep,
    })

    return address
  }

  async update({
    country,
    street,
    number,
    state,
    city,
    cep,
    addressId,
    complement,
    neighborhood,
  }: IEditAddressRequest) {
    const address = await Address.find(addressId)

    if (!address) return null

    address.cep = cep ?? address.cep
    address.city = city ?? address.city
    address.state = state ?? address.state
    address.number = number ?? address.number
    address.street = street ?? address.street
    address.country = country ?? address.country
    address.complement = complement ?? address.complement
    address.neighborhood = neighborhood ?? address.neighborhood

    await address.save()
  }
}
