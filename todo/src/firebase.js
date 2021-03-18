import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDZrcejAN1H9p6xhSVO3bs62n7Y_ppDpu4",
  authDomain: "treinamento-cicopal.firebaseapp.com",
  projectId: "treinamento-cicopal",
  storageBucket: "treinamento-cicopal.appspot.com",
  messagingSenderId: "379713256360",
  appId: "1:379713256360:web:69ce34bfa4080f825efb9d",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

firebase.firestore().settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
});

firebase
  .firestore()
  .enablePersistence()
  .then(() => {
    console.log("Persistencia habilitada com sucesso");
  })
  .catch((error) => {
    console.error("Erro na habilitacao da persistencia", error.message);
  });

export default firebaseApp;
