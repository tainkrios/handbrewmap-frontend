import { collection, getDocs, query, limit, startAfter } from 'firebase/firestore'
import { db } from './config'

export const getPlaces = async (limit_value = 50, lastDoc = null, signal) => {
  try {
    let q
    if (lastDoc) {
      q = query(
        collection(db, 'places'),
        startAfter(lastDoc),
        limit(limit_value),
      )
    } else {
      q = query(collection(db, 'places'), limit(limit_value))
    }

    const querySnapshot = await getDocs(q, { signal })
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return {
      documents,
      lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1] || null,
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      return { documents: [], lastDoc: null }
    }
    console.error(error)
    return { documents: [], lastDoc: null }
  }
}
