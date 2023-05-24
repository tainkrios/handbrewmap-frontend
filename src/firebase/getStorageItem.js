import { ref, getDownloadURL } from 'firebase/storage'
import { storage } from './config'

export const getItemFromStorage = async (itemName) => {
  try {
    const itemRef = ref(storage, `img/${itemName}`)
    const downloadUrl = await getDownloadURL(itemRef)

    return { url: downloadUrl }
  } catch (error) {
    console.error(error)
    return null
  }
}
