import firebase from 'firebase';
import firebaseui from 'firebaseui';

firebase.initializeApp({
  apiKey: 'AIzaSyCClhpNC_ft9ptq-kNNMZi_oyAGUa0Zupw',
  authDomain: 'cooking-tutorials.firebaseapp.com',
  databaseURL: 'https://cooking-tutorials.firebaseio.com',
});

const authUI = new firebaseui.auth.AuthUI(firebase.auth());
const database = firebase.database();

export { firebase, authUI, database };
