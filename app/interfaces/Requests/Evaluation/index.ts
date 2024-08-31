/* eslint-disable @typescript-eslint/naming-convention */
export interface IStoreEvaluation {
  note: number
  description?: string
}

export interface IUpdateEvaluation {
  evaluationId: string
  note?: number
  description?: string
}

export interface IEvaluationId {
  evaluationId: string
}
