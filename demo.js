import { app, database } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const dbInstance = collection(database, "notes");

const saveNote = () => {
  addDoc(dbInstance, {
    noteTitle: noteTitle,
  });
};
