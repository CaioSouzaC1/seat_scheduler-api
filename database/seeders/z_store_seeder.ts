import CompanyAttachement from '#models/company_attachement'
import Store from '#models/store'
import StoreUser from '#models/store_user'
import User from '#models/user'
import { makeAddress } from '#tests/utils/factories/make_address'
import { makeCompany } from '#tests/utils/factories/make_company'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { randomUUID } from 'node:crypto'
import { join, resolve } from 'node:path'
import { promises as fs } from 'node:fs'
import StoreAttachement from '#models/store_attachement'

export default class extends BaseSeeder {
  async run() {
    const company = await makeCompany()
    const imagePath = join(resolve(), '/tests/utils/', 'dog-marine.jpg')
    const image = await fs.readFile(imagePath)
    const uploadPath = join(resolve(), 'uploads/companies', 'dog-marine.jpg')
    await fs.mkdir(join(resolve(), 'uploads/companies'), { recursive: true })
    await fs.writeFile(uploadPath, image)
    await CompanyAttachement.create({
      id: randomUUID(),
      companyId: company.id,
      imagePath: '/uploads/companies/dog-marine.jpg',
    })
    const address = await makeAddress()

    const store = await Store.create({
      id: randomUUID(),
      companyId: company.id,
      name: 'Timão Store',
      addressId: address.id,
      phone: '12445635',
      description: 'SCCP',
    })

    await StoreAttachement.create({
      id: randomUUID(),
      imagePath: '/uploads/companies/dog-marine.jpg',
      name: 'dog-marine',
      storeId: store.id,
      type: 'xd',
    })

    const user = await User.firstOrFail()

    await StoreUser.create({
      id: randomUUID(),
      storeId: store.id,
      userId: user.id,
    })
  }
}
