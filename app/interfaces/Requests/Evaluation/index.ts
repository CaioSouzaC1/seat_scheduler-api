export interface IStoreEvaluation {
  userId: string
  storeId: string
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
