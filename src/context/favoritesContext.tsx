import {createContext, type FunctionComponent, type PropsWithChildren, useEffect, useState} from 'react'
import type {IPuzzle} from '@/models/puzzle.ts'

const STORAGE_KEY = 'zet-en-mat-favorites'

interface IFavoritesContext {
  favorites: IPuzzle[]
  isFavorite: (id: string) => boolean
  toggleFavorite: (puzzle: IPuzzle) => void
}

export const FavoritesContext = createContext<IFavoritesContext>({
  favorites: [],
  isFavorite: () => false,
  toggleFavorite: () => {},
})

const loadFavorites = (): IPuzzle[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? (JSON.parse(stored) as IPuzzle[]) : []
  } catch {
    return []
  }
}

const FavoritesProvider: FunctionComponent<PropsWithChildren> = ({children}) => {
  const [favorites, setFavorites] = useState<IPuzzle[]>(loadFavorites)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      // Opslaan is een extraatje, de app blijft werken zonder localStorage.
    }
  }, [favorites])

  const isFavorite = (id: string): boolean => favorites.some(favorite => favorite.id === id)

  const toggleFavorite = (puzzle: IPuzzle): void => {
    setFavorites(oldFavorites =>
      oldFavorites.some(favorite => favorite.id === puzzle.id)
        ? oldFavorites.filter(favorite => favorite.id !== puzzle.id)
        : [...oldFavorites, puzzle],
    )
  }

  return <FavoritesContext value={{favorites, isFavorite, toggleFavorite}}>{children}</FavoritesContext>
}

export default FavoritesProvider
