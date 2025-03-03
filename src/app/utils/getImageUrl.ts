import { storage } from "./firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";

export async function getImageUrl(filePath: string) {
  console.log("aaa",filePath)
  const storageRef = ref(storage, filePath);
  return await getDownloadURL(storageRef);
}
