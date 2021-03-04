const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const fb = require("./firebase");
const firebase = require("firebase/app");

require("firebase/firestore");

const app = express();
const auth = fb.auth();
const db = fb.firestore();

app.use(cors());

const authenticate = async (req, res, next) => {
  const headers = req.headers;
  const { email, senha } = headers;

  try {
    const response = await auth.signInWithEmailAndPassword(email, senha);
    req.body.uid = response.user.uid;
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

app.post("/users", async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const response = await auth.createUserWithEmailAndPassword(email, senha);
    const uid = response.user.uid;
    await db
      .collection("users")
      .doc(uid)
      .set({ nome, email });
    return res.status(201).json({ uid });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

app.use(authenticate);

app.post("/tasks", async (req, res) => {
  const { uid, title, description, date } = req.body;
  const created_at = firebase.firestore.Timestamp.fromDate(new Date());
  try {
    const response = await db
      .collection("users")
      .doc(uid)
      .collection("tasks")
      .add({ title, description, date, created_at, status: "pending" });
    return res.status(201).json({ id: response.id });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

app.get("/tasks", async (req, res) => {
  const { uid } = req.body;
  const { date } = req.query;
  try {
    let dbRef = db
      .collection("users")
      .doc(uid)
      .collection("tasks");

    if (date) {
      dbRef = dbRef.where("date", "==", date);
    }
    const response = await dbRef.get();

    const tasks = response.docs.map((doc) => {
      const item = doc.data();
      delete item.created_at;
      return {
        ...item,
        id: doc.id,
      };
    });
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

app.put("/tasks/:id", async (req, res) => {
  const body = req.body;
  const { uid } = body;
  const { id } = req.params;
  delete body.uid;

  try {
    await db
      .collection("users")
      .doc(uid)
      .collection("tasks")
      .doc(id)
      .update({ ...body });
    return res.status(200).send();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  const { uid } = req.body;
  const { id } = req.params;

  const dbRef = db
    .collection("users")
    .doc(uid)
    .collection("tasks")
    .doc(id);

  try {
    const doc = await dbRef.get();

    if (!doc.exists) {
      throw new Error("Documento does not exist");
    }

    await dbRef.delete();
    return res.status(200).send();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

exports.cicopal = functions.https.onRequest(app);
