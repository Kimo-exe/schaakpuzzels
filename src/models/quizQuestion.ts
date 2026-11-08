export type QuizCategory = 'regels' | 'stukken' | 'geschiedenis'

export interface IQuizQuestion {
  id: number
  category: QuizCategory
  question: string
  options: string[]
  correctOption: number
  explanation: string
}
