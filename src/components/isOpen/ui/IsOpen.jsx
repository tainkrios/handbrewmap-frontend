import { useState, useEffect, useContext } from 'react'
import { PropTypes } from 'prop-types'

import { getPlaceOpenStatus } from 'Shared/getPlaceOpenStatus'

import './IsOpen.css'
import { ThemeContext } from 'Contexts/ThemeContext'

export const IsOpen = ({ placeId }) => {
  const [isOpen, setIsOpen] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let timer
    setIsLoading(true)

    const fetchData = async () => {
      try {
        const open_now = await getPlaceOpenStatus(placeId)
        if (open_now !== null) {
          setIsOpen(open_now)
        } else {
          console.log('Failed to fetch place open status')
          setIsOpen(null)
        }
      } catch (error) {
        console.error('Error fetching place open status:', error)
        setIsOpen(null)
      }

      timer = setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }

    fetchData()

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [placeId])

  if (isLoading) {
    return <IsOpenSkeleton />
  }

  return isOpen === null ? (
    <h4>Status unknown</h4>
  ) : (
    <h4 className={isOpen ? 'open' : 'closed'}>
      {isOpen ? 'Open now' : 'Closed'}
    </h4>
  )
}

const IsOpenSkeleton = () => {
  const { dark } = useContext(ThemeContext)
  return (
    <div className={`isopen-skeleton ${dark ? 'dark' : ''}`}>
      <div className='skeleton-text'></div>
    </div>
  )
}

IsOpen.propTypes = {
  placeId: PropTypes.string.isRequired,
}
