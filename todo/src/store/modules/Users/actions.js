import fb from "@/firebase";
import firebaseApp from "firebase/app";
const auth = fb.auth();
const db = fb.firestore();

export default {
  async login({ commit }, payload) {
    const { email, password } = payload;
    try {
      await auth.setPersistence(firebaseApp.auth.Auth.Persistence.SESSION);
      const response = await auth.signInWithEmailAndPassword(email, password);
      const user = await db
        .collection("users")
        .doc(response.user.uid)
        .get();
      commit("setCurrentUser", { ...user.data(), uid: response.user.uid });
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
};
