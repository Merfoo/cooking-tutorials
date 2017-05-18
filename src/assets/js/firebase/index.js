import firebase from 'firebase';
import firebaseui from 'firebaseui';

firebase.initializeApp({
  apiKey: 'AIzaSyCClhpNC_ft9ptq-kNNMZi_oyAGUa0Zupw',
  authDomain: 'cooking-tutorials.firebaseapp.com',
  databaseURL: 'https://cooking-tutorials.firebaseio.com',
  storageBucket: 'gs://cooking-tutorials.appspot.com',
});

const authUI = new firebaseui.auth.AuthUI(firebase.auth());
const database = firebase.database();
const storage = firebase.storage();

export { firebase, authUI, database, storage };
