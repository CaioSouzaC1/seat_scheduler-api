import { cuid } from '@adonisjs/core/helpers'
import {
  ICompanyAttachments,
  IUpdateCompanyAttachments,
} from '../interfaces/Requests/Company/index.js'
import app from '@adonisjs/core/services/app'
import CompanyAttachement from '#models/company_attachement'
import { MultipartFile } from '@adonisjs/core/bodyparser'

export class CompanyattachementService {
  async store({ name, type, companyId, image }: ICompanyAttachments) {
    if (!image) return

    await image.move(app.makePath('uploads/companies'), {
      name: `${cuid()}.${image.extname}`,
    })

    await CompanyAttachement.create({
      name,
      type,
      companyId,
      imagePath: image.filePath,
    })
  }

  async update({ image, companyId, type, name, attachmentId }: IUpdateCompanyAttachments) {
    const attach = await CompanyAttachement.findBy({ id: attachmentId, companyId })

    if (!attach) return

    attach.name = name ?? attach.name
    attach.type = type ?? attach.type

    if (image) {
      await image.move(app.makePath('uploads/companies'), {
        name: `${cuid()}.${image.extname}`,
      })
      attach.imagePath = image!.filePath!
    } else attach.imagePath = attach!.imagePath

    await attach.save()
  }
}
