import React from "react";
import Image from "next/image";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { IoStatsChartOutline } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import { LuShare } from "react-icons/lu";

const FeedCard: React.FC = () => {
    return (
      <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 hover:bg-gray-900 p-4 transition-all cursor-pointer">
        <div className="grid grid-cols-12 gap-4">
          {/* Avatar */}
          <div className="col-span-2 sm:col-span-1">
            <Image
              className="rounded-full"
              src="https://avatars.githubusercontent.com/u/85993981?v=4"
              alt="user-image"
              height={50}
              width={50}
            />
          </div>
  
          {/* Post Content */}
          <div className="col-span-10 sm:col-span-11">
            <h5 className="font-bold">
              <span>Imamuddin Shaik </span>
              <span className="font-thin text-gray-500 p-1">@imamuddinshaik</span>
            </h5>
            <p className="text-sm sm:text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
              suscipit, eius soluta quas pariatur et obcaecati, ratione provident
              impedit dignissimos distinctio perferendis non quae magnam labore
              sit nulla aliquid ducimus.
            </p>
  
            {/* Action Icons */}
            <div className="flex justify-between text-xl text-gray-500 w-full mt-4">
              <div className="flex items-center justify-center hover:bg-gray-200 rounded-full w-10 h-10">
                <BiMessageRounded className="text-gray-500 hover:text-blue-500" />
              </div>
              <div className="flex items-center justify-center hover:bg-gray-200 rounded-full w-10 h-10">
                <FaRetweet className="text-gray-500 hover:text-green-500" />
              </div>
              <div className="flex items-center justify-center hover:bg-gray-200 rounded-full w-10 h-10">
                <FaRegHeart className="text-gray-500 hover:text-red-500" />
              </div>
              <div className="flex items-center justify-center hover:bg-gray-200 rounded-full w-10 h-10">
                <IoStatsChartOutline className="text-gray-500 hover:text-purple-500" />
              </div>
              <div className="flex items-center justify-center hover:bg-gray-200 rounded-full w-10 h-10">
                <CiBookmark className="text-gray-500 hover:text-yellow-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default FeedCard;
  