import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import {Button, Card, CardContent, Chip, Stack, Typography} from '@mui/material'
import type {FunctionComponent} from 'react'
import {quizCategoryLabels} from '@/data/quizQuestions.ts'
import type {QuizCategory} from '@/models/quizQuestion.ts'

export type QuizCategoryFilter = QuizCategory | 'all'

interface QuizStartProps {
  selectedCategory: QuizCategoryFilter
  questionCounts: Record<QuizCategoryFilter, number>
  onSelectCategory: (category: QuizCategoryFilter) => void
  onStart: () => void
}

const categories: QuizCategoryFilter[] = ['all', 'regels', 'stukken', 'geschiedenis']

const getCategoryLabel = (category: QuizCategoryFilter): string =>
  category === 'all' ? 'Alles door elkaar' : quizCategoryLabels[category]

const QuizStart: FunctionComponent<QuizStartProps> = ({
  selectedCategory,
  questionCounts,
  onSelectCategory,
  onStart,
}) => {
  const categoryChips = categories.map(category => (
    <Chip
      key={category}
      label={`${getCategoryLabel(category)} (${questionCounts[category]})`}
      color={category === selectedCategory ? 'primary' : 'default'}
      variant={category === selectedCategory ? 'filled' : 'outlined'}
      onClick={() => onSelectCategory(category)}
    />
  ))

  return (
    <Card>
      <CardContent sx={{p: 4}}>
        <Typography variant="h5" component="h2" gutterBottom>
          Kies een categorie
        </Typography>
        <Typography color="text.secondary" sx={{mb: 3}}>
          Na elke vraag zie je meteen of je antwoord juist was, samen met een korte uitleg.
        </Typography>
        <Stack direction="row" spacing={1} useFlexGap sx={{flexWrap: 'wrap', mb: 4}}>
          {categoryChips}
        </Stack>
        <Button variant="contained" size="large" startIcon={<PlayArrowIcon />} onClick={onStart}>
          Start quiz ({questionCounts[selectedCategory]} vragen)
        </Button>
      </CardContent>
    </Card>
  )
}

export default QuizStart
