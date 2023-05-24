import { useState, useEffect } from 'react'
import './IsOpen.css'
import { getPlaceOpenStatus } from 'shared/getPlaceOpenStatus'

export const IsOpen = ({ placeId }) => {
  const [isOpen, setIsOpen] = useState()

  useEffect(() => {
    getPlaceOpenStatus(placeId).then((open_now) => {
      if (open_now !== null) {
        setIsOpen(open_now)
      } else {
        console.log('Failed to fetch place open status')
      }
    })
  }, [placeId])

  return (
    <>
      {isOpen ? (
        <h4 className='open'>Open now</h4>
      ) : (
        <h4 className='closed'>Closed</h4>
      )}
    </>
  )
}
