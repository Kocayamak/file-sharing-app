import React from "react";

const ProgressBar = ({ progess }) => {
  return (
    <div className="bg-gray-400 w-full mt-7 rounded-full">
      <div
        className="py-0.5 bg-primary rounded-full text-white text-center"
        style={{ width: `${progess}%` }}
      >
        {`${Number(progess).toFixed(0)}%`}
      </div>
    </div>
  );
};

export default ProgressBar;
