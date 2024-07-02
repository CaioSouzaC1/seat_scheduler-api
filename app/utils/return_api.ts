import { IReturnApiDTO } from '../interfaces/ReturnApi/index.js'

export default class ReturnApi {
  public static success({ response, data = null, message = '', code = 200 }: IReturnApiDTO) {
    response.status(code).send({ error: false, data, message })
  }

  public static error({ response, data = null, message = '', code = 500 }: IReturnApiDTO) {
    response.status(code).send({ error: true, data, message })
  }
}
