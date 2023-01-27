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

  const now = useMemo(() => new Date(), [])
  const currentDay = days[now.getDay()]

  const newDate = new Date()

  const [isOpen, setIsOpen] = useState(currentDay)

  const openingTime = newDate.setHours(
    weekDays[currentDay][0][0],
    weekDays[currentDay][0][1]
  )
  const closingTime = newDate.setHours(
    weekDays[currentDay][1][0],
    weekDays[currentDay][1][1]
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
