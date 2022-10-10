import { useState } from 'react'
import './SelectedPlace.css'

export const SelectedPlace = (props) => {
  // const [place, setPlace] = useState(null)

  // const plaseHandler = (props.place) => {
  //   setPlace(props.place)
  // }

  return (
    <div className='selectedPlaces'>
      <div>
        <img
          src={`./../assets/img/${props.src}.jpg'`}
          alt='PlaceView'
        />
      </div>
      <div>
        <div>{props.name}</div>
        <div>{props.description}</div>
        <div>{`${props.street} ${props.number}`}</div>
      </div>
    </div>
  )
}
