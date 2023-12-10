"use client";

import React from "react";
import UploadForm from "./_components/UploadForm";
import { app } from "@/firebaseConfig";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

const Upload = () => {
  const storage = getStorage(app);

  const uploadFile = (file) => {
    const fileRef = ref(storage, "files/" + file?.name);

    const metaData = {
      contentType: file?.type,
    }

    const uploadTask = uploadBytesResumable(fileRef, file, file?.type);

    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");

      progress == 100 && getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
      });
    })
  }

  return (
    <div className="p-5">
      <h2 className="text-[20px] text-center m-5">
        <strong className="text-primary">Dosya Yüklemeye</strong> başla ve{" "}
        <strong className="text-primary">Paylaş</strong>
      </h2>
      <UploadForm uploadBtnClick={(file) => uploadFile(file)} />
    </div>
  );
};

export default Upload;
