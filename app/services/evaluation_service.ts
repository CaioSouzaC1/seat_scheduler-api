import Evaluation from '#models/evaluation'
import {
  IEvaluationId,
  IStoreEvaluation,
  IUpdateEvaluation,
} from '../interfaces/Requests/Evaluation/index.js'
import { IIndexRequest } from '../interfaces/ReturnApi/index.js'

export class EvaluationService {
  async index({ page, limit, id: userId }: IIndexRequest) {
    const evaluation = await Evaluation.query()
      .preload('store')
      .preload('user')
      .whereHas('user', (query) => {
        query.where('id', userId!)
      })
      .paginate(page, limit)

    return evaluation.toJSON()
  }

  async store({ note, description }: IStoreEvaluation) {
    await Evaluation.create({ note, description })
  }

  async update({ description, note, evaluationId }: IUpdateEvaluation) {
    const evaluation = await Evaluation.find(evaluationId)

    if (!evaluation) return null

    evaluation.note = note ?? evaluation.note
    evaluation.description = description ?? evaluation.description

    await evaluation.save()
  }

  async show({ evaluationId }: IEvaluationId) {
    const evaluation = await Evaluation.query()
      .preload('user')
      .preload('store')
      .where('id', evaluationId)

    return evaluation
  }

  async delete({ evaluationId }: IEvaluationId) {
    const evaluation = await Evaluation.find(evaluationId)

    await evaluation?.delete()
  }
}
