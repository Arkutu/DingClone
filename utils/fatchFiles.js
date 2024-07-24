import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";

export const listFiles = async (directory) => {
  const listRef = ref(storage, directory);
  try {
    const res = await listAll(listRef);
    const urls = await Promise.all(
      res.items.map((itemRef) => getDownloadURL(itemRef))
    );
    return urls;
  } catch (error) {
    console.error("Failed to list files:", error);
    throw error;
  }
};
