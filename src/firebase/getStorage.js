import { ref, listAll, getDownloadURL } from 'firebase/storage'
import { storage } from './config'

export const getStorage = async () => {
  const storageRef = ref(storage, 'img')
  const listResult = await listAll(storageRef)

  const filesArr = await Promise.all(
    listResult.items.map(async (itemRef) => {
      const downloadUrl = await getDownloadURL(itemRef)
      return {
        name: itemRef.name,
        url: downloadUrl,
      }
    })
  )

  return { filesArr }
}
