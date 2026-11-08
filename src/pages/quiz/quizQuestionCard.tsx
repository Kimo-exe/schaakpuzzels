import {Alert, Button, Card, CardActions, CardContent, Chip, Stack, Typography} from '@mui/material'
import type {FunctionComponent} from 'react'
import {quizCategoryLabels} from '@/data/quizQuestions.ts'
import type {IQuizQuestion} from '@/models/quizQuestion.ts'
import AnswerOption, {type AnswerState} from '@/pages/quiz/answerOption.tsx'

interface QuizQuestionCardProps {
  question: IQuizQuestion
  selectedOption: number | undefined
  isLastQuestion: boolean
  onSelectOption: (option: number) => void
  onNext: () => void
}

const getAnswerState = (option: number, selectedOption: number | undefined, correctOption: number): AnswerState => {
  if (selectedOption === undefined) return 'idle'
  if (option === correctOption) return 'correct'
  if (option === selectedOption) return 'wrong'
  return 'dimmed'
}

const QuizQuestionCard: FunctionComponent<QuizQuestionCardProps> = ({
  question,
  selectedOption,
  isLastQuestion,
  onSelectOption,
  onNext,
}) => {
  const answered = selectedOption !== undefined
  const isCorrect = selectedOption === question.correctOption

  const answerOptions = question.options.map((option, index) => (
    <AnswerOption
      key={option}
      label={option}
      state={getAnswerState(index, selectedOption, question.correctOption)}
      disabled={answered}
      onSelect={() => onSelectOption(index)}
    />
  ))

  return (
    <Card>
      <CardContent sx={{p: 4}}>
        <Chip size="small" label={quizCategoryLabels[question.category]} sx={{mb: 2}} />
        <Typography variant="h5" component="h2" sx={{mb: 3}}>
          {question.question}
        </Typography>
        <Stack spacing={1.5}>{answerOptions}</Stack>
        {answered && (
          <Alert severity={isCorrect ? 'success' : 'error'} sx={{mt: 3}}>
            {isCorrect ? 'Juist! ' : 'Helaas, fout. '}
            {question.explanation}
          </Alert>
        )}
      </CardContent>
      <CardActions sx={{justifyContent: 'flex-end', px: 4, pb: 3}}>
        <Button variant="contained" disabled={!answered} onClick={onNext}>
          {isLastQuestion ? 'Bekijk resultaat' : 'Volgende vraag'}
        </Button>
      </CardActions>
    </Card>
  )
}

export default QuizQuestionCard
