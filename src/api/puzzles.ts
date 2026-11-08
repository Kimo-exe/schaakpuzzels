import {
  type UseSuspenseInfiniteQueryResult,
  type UseSuspenseQueryResult,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query'
import type {IPuzzle, IPuzzleResponse} from '@/models/puzzle.ts'
import {mapPuzzleResponse, uniquePuzzles} from '@/utils/puzzleUtils.ts'

const API_BASE_URL = 'https://api.chess.com/pub'

const getPuzzle = async (path: string): Promise<IPuzzle> => {
  const response = await fetch(`${API_BASE_URL}${path}`)

  if (response.status === 429) {
    throw new Error('Chess.com ontvangt momenteel te veel verzoeken, probeer het zo meteen opnieuw.')
  }
  if (!response.ok) {
    throw new Error(`De puzzel kon niet opgehaald worden (status ${response.status}).`)
  }

  const data = (await response.json()) as IPuzzleResponse
  return mapPuzzleResponse(data)
}

const getDailyPuzzle = (): Promise<IPuzzle> => getPuzzle('/puzzle')

const getRandomPuzzle = (): Promise<IPuzzle> => getPuzzle('/puzzle/random')

/**
 * De eerste pagina bevat de puzzel van de dag en een willekeurige puzzel, elke volgende pagina één willekeurige puzzel.
 * De requests worden na elkaar uitgevoerd omdat Chess.com parallelle requests kan blokkeren.
 */
const getPuzzlePage = async (pageParam: number): Promise<IPuzzle[]> => {
  if (pageParam === 0) {
    const dailyPuzzle = await getDailyPuzzle()
    const randomPuzzle = await getRandomPuzzle()
    return [dailyPuzzle, randomPuzzle]
  }

  return [await getRandomPuzzle()]
}

export const useGetDailyPuzzle = (): UseSuspenseQueryResult<IPuzzle, Error> => {
  return useSuspenseQuery({
    queryKey: ['puzzle', 'daily'],
    queryFn: getDailyPuzzle,
    staleTime: 1000 * 60 * 60,
  })
}

export const useGetPuzzleCollection = (): UseSuspenseInfiniteQueryResult<IPuzzle[], Error> => {
  return useSuspenseInfiniteQuery({
    queryKey: ['puzzle', 'collection'],
    queryFn: ({pageParam}) => getPuzzlePage(pageParam),
    initialPageParam: 0,
    getNextPageParam: (_lastPage, _allPages, lastPageParam) => lastPageParam + 1,
    select: data => uniquePuzzles(data.pages.flat()),
    staleTime: Infinity,
  })
}
