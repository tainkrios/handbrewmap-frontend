import { useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'

import { getPlaceOpenStatus } from 'Shared/getPlaceOpenStatus'

import './IsOpen.css'

export const IsOpen = ({ placeId }) => {
  const [isOpen, setIsOpen] = useState(null)

  useEffect(() => {
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
    }

    fetchData()
  }, [placeId])

  return isOpen === null ? (
    <h4>Status unknown</h4>
  ) : (
    <h4 className={isOpen ? 'open' : 'closed'}>
      {isOpen ? 'Open now' : 'Closed'}
    </h4>
  )
}

IsOpen.propTypes = {
  placeId: PropTypes.string.isRequired,
}
