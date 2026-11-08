import type {FunctionComponent} from 'react'
import {Route, Routes} from 'react-router'
import PageNotFound from '@/pages/404/pageNotFound.tsx'
import Home from '@/pages/home/home.tsx'
import Puzzles from '@/pages/puzzles/puzzles.tsx'
import Quiz from '@/pages/quiz/quiz.tsx'

const Routing: FunctionComponent = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Home />} />
      <Route path={'/puzzels'} element={<Puzzles />} />
      <Route path={'/quiz'} element={<Quiz />} />
      <Route path={'*'} element={<PageNotFound />} />
    </Routes>
  )
}

export default Routing
