"use client";

import React, { useEffect, useState } from "react";
import { app } from "@/firebaseConfig";
import { doc, getFirestore, getDoc } from "firebase/firestore";
import Link from "next/link";
import { ArrowLeftSquare } from "lucide-react";
import FileInfo from "./components/FileInfo";
import FileShareForm from "./components/FileShareForm";

const FilePreview = ({ params }) => {
  const db = getFirestore(app);
  const [file, setFile] = useState();

  useEffect(() => {
    console.log(params.fileId);
    getFileInfo();
  }, [params.fileId]);

  const getFileInfo = async () => {
    const docRef = doc(db, "files", params.fileId);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
      console.log("Document data:", docSnap.data());

      setFile(docSnap.data());
    } else {
      console.log("No such document!");
    }

  }

  return (
    <div className="py-10 px-20">
      <Link href="/upload" className="flex gap-3">
        <ArrowLeftSquare className="cursor-pointer" />

        Dosya Yüklemeye Geri Dön
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
        {file && <FileInfo file={file} />}
      </div>
    </div>
  );
};

export default FilePreview;
