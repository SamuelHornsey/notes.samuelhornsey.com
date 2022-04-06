import {
  getDocs,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import { IfcNote } from "../types/interfaces";
import { db } from "./firebase";

// New note interface
interface NewNote {
  name: string;
  content?: string;
}

/**
 * Creates a new note in the db
 *
 * @param uid users id
 * @param folder notes folder
 * @param note note data
 * @returns firebase document
 */
const createNote = async (uid: string, folder: string, note: NewNote) => {
  const { name, content = "" } = note;
  const doc = await addDoc(
    collection(db, `notes/${uid}/folders/${folder}/notes`),
    {
      name,
      content,
      timestamp: serverTimestamp(),
    }
  );

  return doc;
};

interface UpdateNote {
  name?: string;
  content?: string;
}


// @TODO fix
const updateNote = async (
  uid: string,
  folder: string,
  id: string,
  note: UpdateNote
) => {
  let data: any = {};

  if (note.name) {
    data.name = note.name;
  }

  if (note.content) {
    data.content = note.content;
  }

  return await updateDoc(
    doc(db, `/notes/${uid}/folders/${folder}/notes/${id}`),
    data
  );
};

/**
 * Deletes a note by id
 * @param uid user id
 * @param folder folder id
 * @param id note id
 * @returns 
 */
const deletNote = async (uid: string, folder: string, id: string) => {
  return await deleteDoc(doc(db, `notes/${uid}/folders/${folder}/notes/${id}`));
};

/**
 * Returns all notes in folder
 * @param uid user id
 * @param folder folder id
 * @returns Notes
 */
const getNotes = async (uid: string, folder: string) => {
  const notes: Array<IfcNote> = [];
  const docs = await getDocs(
    query(
      collection(db, `notes/${uid}/folders/${folder}/notes`),
      orderBy("timestamp")
    )
  );

  docs.forEach((doc) => {
    const { name, timestamp, content } = doc.data();
    notes.push({
      uuid: doc.id,
      name,
      timestamp,
      content,
    });
  });

  return notes;
};

/**
 * Subscribes to notes changes
 * @param uid user id
 * @param folder folder id
 * @param cb callback function
 * @returns 
 */
const subscribeNotes = (uid: string, folder: string, cb: Function) => {
  return onSnapshot(
    query(
      collection(db, `notes/${uid}/folders/${folder}/notes`),
      orderBy("timestamp")
    ),
    (docs) => {
      const notes: Array<IfcNote> = [];

      docs.forEach((doc) => {
        const { name, timestamp, content } = doc.data();
        notes.push({
          uuid: doc.id,
          name,
          timestamp,
          content,
        });
      });

      cb(notes);
    }
  );
};

export { createNote, updateNote, deletNote, getNotes, subscribeNotes };
