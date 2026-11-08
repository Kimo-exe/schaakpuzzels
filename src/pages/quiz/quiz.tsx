import QuizIcon from '@mui/icons-material/Quiz'
import {type FunctionComponent, useState} from 'react'
import PageHeader from '@/components/pageHeader.tsx'
import {quizQuestions} from '@/data/quizQuestions.ts'
import QuizProgress from '@/pages/quiz/quizProgress.tsx'
import QuizQuestionCard from '@/pages/quiz/quizQuestionCard.tsx'
import QuizResult from '@/pages/quiz/quizResult.tsx'
import QuizStart, {type QuizCategoryFilter} from '@/pages/quiz/quizStart.tsx'

type QuizStatus = 'start' | 'playing' | 'finished'

const questionCounts: Record<QuizCategoryFilter, number> = {
  all: quizQuestions.length,
  regels: quizQuestions.filter(question => question.category === 'regels').length,
  stukken: quizQuestions.filter(question => question.category === 'stukken').length,
  geschiedenis: quizQuestions.filter(question => question.category === 'geschiedenis').length,
}

const Quiz: FunctionComponent = () => {
  const [status, setStatus] = useState<QuizStatus>('start')
  const [category, setCategory] = useState<QuizCategoryFilter>('all')
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [answers, setAnswers] = useState<number[]>([])

  const questions =
    category === 'all' ? quizQuestions : quizQuestions.filter(question => question.category === category)
  const currentQuestion = questions[currentIndex]
  const score = answers.filter((answer, index) => answer === questions[index].correctOption).length

  const startHandler = (): void => {
    setCurrentIndex(0)
    setAnswers([])
    setStatus('playing')
  }

  const selectOptionHandler = (option: number): void => {
    setAnswers(oldAnswers => [...oldAnswers, option])
  }

  const nextHandler = (): void => {
    if (currentIndex === questions.length - 1) {
      setStatus('finished')
    } else {
      setCurrentIndex(oldIndex => oldIndex + 1)
    }
  }

  const restartHandler = (): void => {
    setStatus('start')
  }

  return (
    <>
      <PageHeader
        title="Schaakquiz"
        subtitle="Hoe goed ken jij het koninklijke spel? Kies een categorie en beantwoord de vragen."
        icon={<QuizIcon fontSize="large" color="primary" />}
      />
      {status === 'start' && (
        <QuizStart
          selectedCategory={category}
          questionCounts={questionCounts}
          onSelectCategory={setCategory}
          onStart={startHandler}
        />
      )}
      {status === 'playing' && (
        <>
          <QuizProgress current={currentIndex + 1} total={questions.length} score={score} />
          <QuizQuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            selectedOption={answers[currentIndex]}
            isLastQuestion={currentIndex === questions.length - 1}
            onSelectOption={selectOptionHandler}
            onNext={nextHandler}
          />
        </>
      )}
      {status === 'finished' && <QuizResult questions={questions} answers={answers} onRestart={restartHandler} />}
    </>
  )
}

export default Quiz
