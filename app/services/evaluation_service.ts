import Evaluation from '#models/evaluation'
import {
  IEvaluationId,
  IStoreEvaluation,
  IUpdateEvaluation,
} from '../interfaces/Requests/Evaluation/index.js'

export class EvaluationService {
  async index() {
    return await Evaluation.all()
  }

  async store({ storeId, userId, note, description }: IStoreEvaluation) {
    await Evaluation.create({ storeId, userId, note, description })
  }

  async update({ description, note, evaluationId }: IUpdateEvaluation) {
    const evaluation = await Evaluation.find(evaluationId)

    if (!evaluation) return null

    evaluation.note = note ?? evaluation.note
    evaluation.description = description ?? evaluation.description

    await evaluation.save()
  }

  async show({ evaluationId }: IEvaluationId) {
    const evaluation = await Evaluation.find(evaluationId)

    return evaluation
  }

  async delete({ evaluationId }: IEvaluationId) {
    const evaluation = await Evaluation.find(evaluationId)

    await evaluation?.delete()
  }
}
