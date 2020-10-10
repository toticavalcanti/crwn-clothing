import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCQjMmOf4oakoAjqhlTPZugeSGFwVu9ks4",
  authDomain: "crwn-db-b2093.firebaseapp.com",
  databaseURL: "https://crwn-db-b2093.firebaseio.com",
  projectId: "crwn-db-b2093",
  storageBucket: "crwn-db-b2093.appspot.com",
  messagingSenderId: "438318017828",
  appId: "1:438318017828:web:2aa31267748e2d3ad897b1",
  measurementId: "G-7DH5TLEH2J"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapshot = await userRef.get();
  
  if(!snapshot.exists){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;