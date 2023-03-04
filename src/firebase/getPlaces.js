import { collection, getDocs } from 'firebase/firestore'
import { db } from './config'
// import { useState } from 'react'

export const getPlaces = async () => {
  // const [documents, setDocuments] = useState([])
  let documents
  try {
    const data = await getDocs(collection(db, 'places'))
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
    documents = filteredData
    // console.log(documents);

    // setDocuments(filteredData)
  } catch (error) {
    console.error(error)
  }

  return { documents }
}
