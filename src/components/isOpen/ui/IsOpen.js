import { useState, useEffect, useMemo } from 'react'
import './IsOpen.css'
import { getOpenStatus } from 'shared/getPlaceStatus'

export const IsOpen = ({ weekDays, place_id }) => {
  const [isOpen, setIsOpen] = useState()

  useEffect(() => {
    const fetchOpenStatus = async () => {
      const status = await getOpenStatus(place_id)
      setIsOpen(status)
    }
    fetchOpenStatus()
  }, [place_id])

  // const days = [
  //   'Sunday',
  //   'Monday',
  //   'Tuesday',
  //   'Wednesday',
  //   'Thursday',
  //   'Friday',
  //   'Saturday',
  // ]
  // // console.log(weekDays.open[0])

  // const now = useMemo(() => new Date(), [])
  // const currentDay = days[now.getDay()]

  // const newDate = new Date()

  // const [isOpen, setIsOpen] = useState(currentDay)

  // const openingTime = newDate.setHours(
  //   weekDays[currentDay].open[0],
  //   weekDays[currentDay].open[1],
  // )
  // const closingTime = newDate.setHours(
  //   weekDays[currentDay].close[0],
  //   weekDays[currentDay].close[1],
  // )

  // useEffect(() => {
  //   if (new Date(openingTime) <= now && now <= new Date(closingTime)) {
  //     setIsOpen('Open Now')
  //   } else {
  //     setIsOpen('Closed')
  //   }
  // }, [closingTime, now, openingTime])

  // const isOpenClass = isOpen === 'Open Now' ? 'open' : 'closed'

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
