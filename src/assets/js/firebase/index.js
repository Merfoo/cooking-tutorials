import firebase from 'firebase';
import firebaseui from 'firebaseui';

firebase.initializeApp({
  apiKey: 'AIzaSyCClhpNC_ft9ptq-kNNMZi_oyAGUa0Zupw',
  authDomain: 'cooking-tutorials.firebaseapp.com',
});

const authUI = new firebaseui.auth.AuthUI(firebase.auth());

export { firebase, authUI };
