import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyC1fQ1aj1GNayGa6M3Q3prnnMDnOfipYwA",
  authDomain: "crwn-db-toti.firebaseapp.com",
  databaseURL: "https://crwn-db-toti.firebaseio.com",
  projectId: "crwn-db-toti",
  storageBucket: "crwn-db-toti.appspot.com",
  messagingSenderId: "545321621841",
  appId: "1:545321621841:web:8f8aa498eb1eb2ca345b70",
  measurementId: "G-73MNV1KK24"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async ( collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log('Ei! Eu sou a collection REF',collectionRef)

};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
