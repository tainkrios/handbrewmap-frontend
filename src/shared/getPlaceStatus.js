import axios from 'axios'

export const getOpenStatus = async (place_id) => {
  let url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=current_opening_hours/open_now&key=${process.env.REACT_APP_PLACES_API_KEY}`

  try {
    const res = await axios.get(url)

    if (!res.data.status === 'OK') {
      return
    }

    return { open_now: res.data.result.current_opening_hours.open_now }
  } catch (error) {
    console.error(error)
  }
}
