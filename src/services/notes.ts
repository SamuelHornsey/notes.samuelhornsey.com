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
  getDoc,
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
 * @param path path to object
 * @param note note data
 * @returns 
 */
const createNote = async (path: string, note: NewNote) => {
  const { name, content = "" } = note;
  const doc = await addDoc(collection(db, path), {
    name,
    content,
    timestamp: serverTimestamp(),
  });

  return doc;
};

interface UpdateNote {
  name?: string;
  content?: string;
}

// @TODO fix
const updateNote = async (path: string, note: UpdateNote) => {
  let data: any = {};

  if (note.name) {
    data.name = note.name;
  }

  if (note.content) {
    data.content = note.content;
  }

  return await updateDoc(doc(db, path), data);
};

/**
 * Deletes a note by id
 * @param path path to object
 * @param id note id
 * @returns
 */
const deleteNote = async (path: string) => {
  return await deleteDoc(doc(db, path));
};

/**
 * Returns all notes in folder
 * @param path path to object
 * @returns Notes
 */
const getNotes = async (path: string) => {
  const notes: Array<IfcNote> = [];
  const docs = await getDocs(query(collection(db, path), orderBy("timestamp")));

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
 * Retuns a single not
 * @param path 
 * @returns 
 */
const getNote = async (path: string) => {
  const note = await getDoc(doc(db, path));

  const data = note.data();

  return data as IfcNote;
};

/**
 * Subscribes to notes changes
 * @param path path to object
 * @param cb callback function
 * @returns
 */
const subscribeNotes = (path: string, cb: Function) => {
  return onSnapshot(
    query(collection(db, path), orderBy("timestamp")),
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

export { createNote, updateNote, deleteNote, getNotes, getNote, subscribeNotes };
