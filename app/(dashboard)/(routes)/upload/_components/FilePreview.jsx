import React from "react";
import Image from "next/image";
import { X } from "lucide-react";

const FilePreview = ({ file, removeFile }) => {
  return (
    <div className="flex items-center gap-2 justify-between p-2 mt-5 border rounded-md border-blue-400">
      <div className="flex items-center ">
        <Image src="/file.png" width={100} height={100} alt="dosya" />

        <div className="text-left">
          <h2>{file.name}</h2>
          <h2 className="text-[12px] text-gray-400">
            {file.type} / {(file.size / 1024 / 1024).toFixed(2)} MB
          </h2>
        </div>
      </div>

      <X className="cursor-pointer" onClick={() => removeFile()}/>
    </div>
  );
};

export default FilePreview;
