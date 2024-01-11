import React, { useEffect, useState } from "react";
import Image from "next/image";

const FileInfo = ({ file }) => {
  const [_fileType, setFileType] = useState("");

  useEffect(() => {
    file && setFileType(file?.fileType.split("/")[0]);
  }, [file]);

  return (
    file && (
      <div className="text-center border flex justify-center m-4 flex-col items-center p-2 rounded border-blue-200">
        <Image
          src={_fileType == "image" ? file?.fileUrl : "/file.png"}
          width={200}
          height={200}
          alt="file"
          className="h-[200px] rounded-md object-contain"
        />

        <div className="">
            <h2>{file.fileName}</h2>
            <h2 className="text-gray-400 text-[13px]">{file.fileType} / {file.fileSize}</h2>
        </div>
      </div>
    )
  );
};

export default FileInfo;
