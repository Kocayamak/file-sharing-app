"use client";

import React, { useEffect, useState } from "react";
import UploadForm from "./_components/UploadForm";
import { app } from "@/firebaseConfig";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import { generateRandomString } from "@/app/_utils/GenerateRandomString";
import { useRouter } from "next/navigation";

const Upload = () => {
  const { user } = useUser();
  const [progress, setProgress] = useState(0);
  const storage = getStorage(app);
  const db = getFirestore(app);
  const router = useRouter();
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [fileDocId, setFileDocId] = useState("");

  const uploadFile = (file) => {
    const fileRef = ref(storage, "files/" + file?.name);

    const uploadTask = uploadBytesResumable(fileRef, file, file?.type);

    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      setProgress(progress);
      progress == 100 &&
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);

          saveInfo(file, downloadURL);
        });
    });
  };

  const saveInfo = async (file, fileUrl) => {
    const docId = generateRandomString();
    setFileDocId(docId);
  
    await setDoc(doc(db, "files", docId), {
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      fileUrl,
      userEamil: user.primaryEmailAddress.emailAddress,
      userName: user.fullName,
      password: "",
      id: docId,
      shortUrl: process.env.NEXT_PUBLIC_BASE_URL + docId,
    });
  };

  useEffect(() => {
    if(progress == 100){
      setTimeout(() => {
        setUploadCompleted(true);
      }, 1000);
    };
  }, [progress == 100]);

  useEffect(() => {
    if (uploadCompleted) {
      setUploadCompleted(false);
      setTimeout(() => {
        router.push(`/file-preview/${fileDocId}`);
      }, 2000);
    }
  }, [uploadCompleted == true]);

  return (
    <div className="p-5">
      <h2 className="text-[20px] text-center m-5">
        <strong className="text-primary">Dosya Yüklemeye</strong> başla ve{" "}
        <strong className="text-primary">Paylaş</strong>
      </h2>
      <UploadForm
        uploadBtnClick={(file) => uploadFile(file)}
        progress={progress}
      />
    </div>
  );
};

export default Upload;
