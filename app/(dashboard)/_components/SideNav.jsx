"use client";

import { Upload, File } from "lucide-react";
import React, { useState} from "react";
import Image from "next/image";

const SideNav = () => {
  const menuList = [
    {
      id: 1,
      name: "Dosya Yükle",
      icon: Upload,
      path: "upload",
    },
    {
      id: 2,
      name: "Dosyalar",
      icon: File,
      path: "files",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="shadow-sm border-r h-full">
      <div className="p-5 border-b">
        <Image src="/logo.svg" width={150} height={100} />
      </div>
      <div className="flex flex-col float-left w-full">
        {menuList.map((item, index) => (
          <button className={`flex gap-2 p-4 px-6 hover:bg-gray-100 w-full text-gray-500 ${activeIndex == index ? 'bg-blue-50 text-primary' : ''}`} onClick={() => setActiveIndex(index)}>
            <item.icon />
            <h2>{item.name}</h2>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
