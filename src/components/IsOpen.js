import { useState, useEffect, useMemo } from 'react'
import './IsOpen.css'

export const IsOpen = ({ weekDays }) => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  // console.log(weekDays.open[0])

  const now = useMemo(() => new Date(), [])
  const currentDay = days[now.getDay()]

  const newDate = new Date()

  const [isOpen, setIsOpen] = useState(currentDay)

  const openingTime = newDate.setHours(
    weekDays[currentDay].open[0],
    weekDays[currentDay].open[1]
  )
  const closingTime = newDate.setHours(
    weekDays[currentDay].close[0],
    weekDays[currentDay].close[1]
  )

  useEffect(() => {
    if (new Date(openingTime) <= now && now <= new Date(closingTime)) {
      setIsOpen('Open Now')
    } else {
      setIsOpen('Closed')
    }
  }, [closingTime, now, openingTime])

  const isOpenClass = isOpen === 'Open Now' ? 'open' : 'closed'

  return <p className={isOpenClass}>{isOpen}</p>
}
