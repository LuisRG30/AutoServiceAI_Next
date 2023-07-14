import Image from "next/image";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Card from "./Card";
import { randomBackgroundColor } from "../../utils/RandomBackgroundColor";

interface DirectoryUserCardProps {
  name: string;
}

function DirectoryUserCard({ name }: DirectoryUserCardProps) {
  return (
    <Card innerClassName="py-0 sm:p-0" className="m-4">
      <div className="flex items-center justify-between  py-4 px-4">
        <div
          className={`h-[40px] w-[40px] rounded-full bg-blue-100 text-black`}
        >
          {name}
        </div>
        <div className="flex flex-col dark:text-gray-200">
          <h1>{name}</h1>
          <h1>Firmala MX</h1>
        </div>
        <MoreVertIcon />
      </div>
    </Card>
  );
}

export default DirectoryUserCard;
