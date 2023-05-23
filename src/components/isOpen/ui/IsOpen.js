import { useState, useEffect } from 'react'
import './IsOpen.css'
import { getPlaceOpenStatus } from 'shared/getPlaceOpenStatus'

export const IsOpen = ({ placeId }) => {
  const [isOpen, setIsOpen] = useState()

  useEffect(() => {
    getPlaceOpenStatus(placeId).then((openStatus) => {
      if (openStatus !== null) {
        setIsOpen(openStatus)
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
