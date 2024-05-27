import {
  collection,
  query,
  onSnapshot,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase";
import { IfcFolder } from "../types/interfaces";

interface NewFolder {
  name: string;
}

const createFolder = async (path: string, folder: NewFolder) => {
  const { name } = folder;
  const doc = await addDoc(collection(db, path), {
    name,
    timestamp: serverTimestamp(),
  });
  return doc;
};

interface UpdateFolder {
  name: string;
}

const updateFolder = async (path: string, folder: UpdateFolder) => {
  return await updateDoc(doc(db, path), { ...folder });
};

const deleteFolder = async (path: string) => {
  return await deleteDoc(doc(db, path));
};

const subscribeFolders = (path: string, cb: Function) => {
  return onSnapshot(
    query(collection(db, path), orderBy("timestamp")),
    (docs) => {
      const folders: Array<IfcFolder> = [];

      docs.forEach((doc) => {
        const { name, timestamp } = doc.data();
        folders.push({
          folderId: doc.id,
          timestamp,
          name,
        });
      });

      cb(folders);
    }
  );
};

export { subscribeFolders, deleteFolder, updateFolder, createFolder };
