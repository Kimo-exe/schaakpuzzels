import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import ReplayIcon from '@mui/icons-material/Replay'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Rating,
  Typography,
} from '@mui/material'
import type {FunctionComponent} from 'react'
import type {IQuizQuestion} from '@/models/quizQuestion.ts'

interface QuizResultProps {
  questions: IQuizQuestion[]
  answers: number[]
  onRestart: () => void
}

const getResultMessage = (percentage: number): string => {
  if (percentage === 100) return 'Schaakmat! Een perfecte score.'
  if (percentage >= 70) return 'Sterk gespeeld, je kent je klassiekers.'
  if (percentage >= 40) return 'Niet slecht, maar er is nog ruimte voor een betere zet.'
  return 'Dat was een blunder... probeer het gerust opnieuw!'
}

const QuizResult: FunctionComponent<QuizResultProps> = ({questions, answers, onRestart}) => {
  const score = questions.filter((question, index) => answers[index] === question.correctOption).length
  const percentage = Math.round((score / questions.length) * 100)

  const reviewItems = questions.map((question, index) => {
    const correct = answers[index] === question.correctOption
    return (
      <ListItem key={question.id} divider>
        <ListItemIcon>{correct ? <CheckIcon color="success" /> : <CloseIcon color="error" />}</ListItemIcon>
        <ListItemText
          primary={question.question}
          secondary={`Juist antwoord: ${question.options[question.correctOption]}`}
        />
      </ListItem>
    )
  })

  return (
    <Card>
      <CardContent sx={{p: 4, textAlign: 'center'}}>
        <Typography variant="h4" component="h2" gutterBottom>
          {score} / {questions.length} juist
        </Typography>
        <Rating value={(score / questions.length) * 5} precision={0.5} readOnly size="large" />
        <Typography color="text.secondary" sx={{mt: 1, mb: 3}}>
          {getResultMessage(percentage)}
        </Typography>
        <List sx={{textAlign: 'left'}}>{reviewItems}</List>
      </CardContent>
      <CardActions sx={{justifyContent: 'center', pb: 3}}>
        <Button variant="contained" startIcon={<ReplayIcon />} onClick={onRestart}>
          Opnieuw spelen
        </Button>
      </CardActions>
    </Card>
  )
}

export default QuizResult
