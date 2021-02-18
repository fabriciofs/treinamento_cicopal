<template>
  <div>
    <h1>Login</h1>
    <div>
      <input type="email" v-model="email" />
    </div>
    <div>
      <input type="password" v-model="password" />
    </div>
    <div>
      <button @click="login()">Entrar</button>
    </div>
    <div>
      <button @click="listUsers">Lista Usuarios</button>
    </div>
    <div>
      <button @click="listUsersUnder30">
        Lista Usuarios idade menor que 30
      </button>
    </div>
    <div>
      <button @click="addUser()">
        Adiciona usuario
      </button>
    </div>
    <div>
      <button @click="addUser('teste')">
        Adiciona/Altera usuario id Teste
      </button>
    </div>
    <div>
      <button @click="removeUser('teste')">
        Apaga usuario id Teste
      </button>
    </div>
  </div>
</template>

<script>
import fb from "@/firebase";

export default {
  data() {
    return {
      email: "fabricio@fabriciofs.eti.br",
      password: "123456",
    };
  },
  methods: {
    async login(event) {
      console.log({ event });
      try {
        const response = await fb
          .auth()
          .signInWithEmailAndPassword(this.email, this.password);
        const { user } = response;
        const { uid } = user;

        await fb.auth().signOut();

        const doc = await fb
          .firestore()
          .collection("users")
          .doc(uid)
          .get();

        let docData = null;
        if (doc.exists) {
          docData = doc.data();
        } else {
          throw new Error("No such document!");
        }
        console.log({ docData });
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error({ errorCode, errorMessage });
      }

      // fb.auth()
      //   .signInWithEmailAndPassword(this.email, this.password)
      //   .then((response) => {
      //     const { user } = response;
      //     const { uid } = user;
      //     console.log(uid);

      //     fb.auth()
      //       .signOut()
      //       .then(() => {
      //         fb.firestore()
      //           .collection("users")
      //           .doc("naoexists")
      //           .get()
      //           .then(function(doc) {
      //             if (doc.exists) {
      //               const result = doc.data();
      //               console.log("Document data:", result);
      //             } else {
      //               // doc.data() will be undefined in this case
      //               const result = doc.data();
      //               console.log("No such document!", result);
      //             }
      //           })
      //           .catch(function(error) {
      //             console.log("Error getting document:", error);
      //           });
      //       });
      //   })
      //   .catch((error) => {
      //     const errorCode = error.code;
      //     const errorMessage = error.message;
      //     console.error({ errorCode, errorMessage });
      //   });
    },
    async listUsers() {
      const response = await fb
        .firestore()
        .collection("users")
        .get();
      const docs = response.docs;

      const users = docs.map((item) => {
        // const user = item.data();
        // user.id = item.id;
        // return user;
        return { id: item.id, ...item.data() };
      });

      console.log(users);
    },
    async listUsersUnder30() {
      const response = await fb
        .firestore()
        .collection("users")
        .where("age", "<", 30)
        .where("active", "==", true)
        .get();
      const docs = response.docs;

      const users = docs.map((item) => {
        // const user = item.data();
        // user.id = item.id;
        // return user;
        return { id: item.id, ...item.data() };
      });

      console.log(users);
    },
    async addUser(id) {
      try {
        await fb.auth().signInWithEmailAndPassword(this.email, this.password);
        let response = null;
        if (id) {
          response = await fb
            .firestore()
            .collection("users")
            .doc(id)
            .set({
              name: "Wexley",
              age: 36,
              hobbies: ["programar advpl", "pescar"],
            });

          this.removeUser(id);
        } else {
          response = await fb
            .firestore()
            .collection("users")
            .add({
              name: "Wexley",
              age: 35,
              hobbies: ["programar advpl", "pescar"],
            });
        }
        console.log({ response });
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error({ errorCode, errorMessage });
      }
    },
    async removeUser(id) {
      try {
        await fb.auth().signInWithEmailAndPassword(this.email, this.password);
        const response = await fb
          .firestore()
          .collection("users")
          .doc(id)
          .delete();
        console.log({ response });
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error({ errorCode, errorMessage });
      }
    },
  },
};
</script>
