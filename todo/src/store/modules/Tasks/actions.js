import fb from "@/firebase";
const db = fb.firestore();

export default {
  async getTasks({ rootState, commit }) {
    const uid = rootState.Users.currentUser.uid;
    const tasks = [];
    try {
      const responce = await db
        .collection("users")
        .doc(uid)
        .collection("tasks")
        .get();

      responce.docs.forEach((doc) => {
        tasks.push({ ...doc.data(), id: doc.id });
      });
      commit("setUserTasks", tasks);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async addTask({ rootState, dispatch }, payload) {
    const uid = rootState.Users.currentUser.uid;
    try {
      db.collection("users")
        .doc(uid)
        .collection("tasks")
        .add(payload);
      await dispatch("getTasks");
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async deleteTask({ rootState, dispatch }, payload) {
    const uid = rootState.Users.currentUser.uid;
    const { id } = payload;
    try {
      db.collection("users")
        .doc(uid)
        .collection("tasks")
        .doc(id)
        .delete();
      await dispatch("getTasks");
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
