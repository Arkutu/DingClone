import * as DocumentPicker from "expo-document-picker";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";

export const pickAndUploadFile = async (setUploadProgress) => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: [
        "application/pdf",
        "text/plain",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ],
    });

    if (result.canceled) {
      console.log("Document picking was canceled");
      return;
    }

    const fileUri = result.assets[0].uri;
    const fileName = result.assets[0].name;

    console.log("File URI:", fileUri);
    console.log("File Name:", fileName);

    const response = await fetch(fileUri);
    const blob = await response.blob();

    const storageRef = ref(storage, `docs/${fileName}`);

    const uploadTask = uploadBytesResumable(storageRef, blob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (setUploadProgress) {
            setUploadProgress(progress);
          }
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Upload failed:", error);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            if (setUploadProgress) {
              setUploadProgress(100);
            }
            console.log("File available at", downloadURL);
            resolve(downloadURL);
          } catch (error) {
            console.error("Failed to get download URL:", error);
            reject(error);
          }
        }
      );
    });
  } catch (error) {
    console.error("File upload failed:", error);
    throw error;
  }
};
