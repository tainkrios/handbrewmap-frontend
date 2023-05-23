import axios from 'axios'

export const getPlaceOpenStatus = async (placeId) => {
  let url = `https://88.210.9.231:1963/${placeId}`
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    const response = await axios.get(url, config)
    const data = await response.data
    const open_now = data.open_now
    return open_now
  } catch (error) {
    console.error(error)
  }
}
