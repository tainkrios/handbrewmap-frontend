import { collection, getDocs } from 'firebase/firestore'
import { db } from './config'

export const getPlaces = async () => {
  let documents
  try {
    const data = await getDocs(collection(db, 'places'))
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
    documents = filteredData
  } catch (error) {
    console.error(error)
  }

  return { documents }
}
