import IReturnApiDTO from '../interfaces/ReturnApi/index.js'

export default class ReturnApi {
  static success({ response, data = null, message = '', code = 200 }: IReturnApiDTO) {
    response.status(code).send({ error: false, message, data })
  }

  static error({ response, data = null, message = '', code = 500 }: IReturnApiDTO) {
    response.status(code).send({ error: true, message, data })
  }
}
