const firebase = require("firebase/app");
require("firebase/firestore");
require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyDZrcejAN1H9p6xhSVO3bs62n7Y_ppDpu4",
  authDomain: "treinamento-cicopal.firebaseapp.com",
  projectId: "treinamento-cicopal",
  storageBucket: "treinamento-cicopal.appspot.com",
  messagingSenderId: "379713256360",
  appId: "1:379713256360:web:69ce34bfa4080f825efb9d",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

module.exports = firebaseApp;
