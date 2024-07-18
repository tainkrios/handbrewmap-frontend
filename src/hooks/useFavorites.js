import { useState, useEffect, useCallback } from 'react'

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites')
    return storedFavorites ? JSON.parse(storedFavorites) : []
  })

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const addToFavorites = useCallback((placeId) => {
    setFavorites((prev) => {
      if (!prev.includes(placeId)) {
        return [...prev, placeId]
      }
      return prev
    })
  }, [])

  const removeFromFavorites = useCallback((placeId) => {
    setFavorites((prev) => prev.filter((id) => id !== placeId))
  }, [])

  return { favorites, addToFavorites, removeFromFavorites }
}
