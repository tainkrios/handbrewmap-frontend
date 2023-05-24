import { collection, getDocs } from 'firebase/firestore'
import { db } from './config'

export const getPlaces = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'places'))
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return { documents }
  } catch (error) {
    console.error(error)
    return { documents: [] }
  }
}
