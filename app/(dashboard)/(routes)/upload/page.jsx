import React from "react";
import UploadForm from "./_components/UploadForm";

const Upload = () => {
  return (
    <div className="p-5">
      <h2 className="text-[20px] text-center m-5">
        <strong className="text-primary">Dosya Yüklemeye</strong> başla ve{" "}
        <strong className="text-primary">Paylaş</strong>
      </h2>
      <UploadForm />
    </div>
  );
};

export default Upload;
