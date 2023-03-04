import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: 'berlin-coffee-map.firebaseapp.com',
  projectId: 'berlin-coffee-map',
  storageBucket: 'berlin-coffee-map.appspot.com',
  messagingSenderId: '1035057134186',
  appId: '1:1035057134186:web:b59be7524287b654556813',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
