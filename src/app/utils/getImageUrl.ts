import { storage } from "./firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";

export async function getImageUrl(filePath: string) {
  const storageRef = ref(storage, filePath);
  return await getDownloadURL(storageRef);
}
