import './SelectedPlace.css'

export const SelectedPlace = ({ data }) => {
  return (
    <div className='selectedPlaces'>
      <div className='img-container'>
        <img
          src={require(`./../assets/img/${data.img_src}.jpg`)}
          alt='PlaceView'
        />
      </div>
      <div>
        <h2>{data?.name}</h2>
        <p>{data?.description}</p>
        <p>{`${data.addr_street} ${data.addr_housenumber}`}</p>
      </div>
    </div>
  )
}
