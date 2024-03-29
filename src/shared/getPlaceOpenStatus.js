import axios from 'axios'

export const getPlaceOpenStatus = async (placeId) => {
  let url = `https://us-central1-berlin-coffee-map.cloudfunctions.net/api/${placeId}`
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    const response = await axios.get(url, config)
    const data = await response.data
    const open_now = data.result.opening_hours.open_now
    return open_now
  } catch (error) {
    console.error(error)
  }
}
