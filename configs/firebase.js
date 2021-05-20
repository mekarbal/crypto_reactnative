import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyDZbJnNcCZ_taa0up-U17_GiZInQiBLZwc",
  authDomain: "currency-2222b.firebaseapp.com",
  projectId: "currency-2222b",
  storageBucket: "currency-2222b.appspot.com",
  messagingSenderId: "89196078632",
  appId: "1:89196078632:web:5b6236241dffd707eb771d",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
