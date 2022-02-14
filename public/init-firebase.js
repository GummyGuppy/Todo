import firebase from 'firebase/app'
import 'firebase/firestore'


if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyAkQ-kCPQAICJxZf4rlyXV7iMLUOAJGZUo",
    authDomain: "birdinthehand-5d5f7.firebaseapp.com",
    projectId: "birdinthehand-5d5f7"
  });
}else {
  firebase.app(); // if already initialized, use that one
}

//-- FIRESTORE COLLETION NAME --
//Alter this value based on the firestore collection to be used
export const COLLECTION = 'Todo'

const db = firebase.firestore()
export {db}