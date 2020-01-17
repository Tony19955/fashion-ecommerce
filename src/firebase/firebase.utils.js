import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAybDBiGBcd3-miQZRK05uVjy1SmHAHev0",
  authDomain: "crwn-db-85bc3.firebaseapp.com",
  databaseURL: "https://crwn-db-85bc3.firebaseio.com",
  projectId: "crwn-db-85bc3",
  storageBucket: "crwn-db-85bc3.appspot.com",
  messagingSenderId: "667109224006",
  appId: "1:667109224006:web:818c5deef2df01c48e2447",
  measurementId: "G-SRS2FB5YEV"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('Error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;