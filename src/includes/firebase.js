import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyD8IJxSx86Ikclv1RRpqbrARHaqV6gIkvw',
  authDomain: 'music-c31f9.firebaseapp.com',
  projectId: 'music-c31f9',
  storageBucket: 'music-c31f9.appspot.com',
  messagingSenderId: '319993274608',
  appId: '1:319993274608:web:949c333f8fc58beeeea235'
}

export default firebase.initializeApp(firebaseConfig)



export const auth = firebase.auth()
export const db = firebase.firestore()

export const usersCollection = db.collection('users')
