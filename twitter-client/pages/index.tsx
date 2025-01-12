import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { FaXTwitter } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { BiMessageDetail } from "react-icons/bi";
import { FaBrain } from "react-icons/fa";
import { PiBookmarkSimple } from "react-icons/pi";
import { FaUserFriends } from "react-icons/fa";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { CiCircleMore } from "react-icons/ci";
import React from "react";
import FeedCard from "@/components/FeedCard";

import { Inter } from "next/font/google";

// Font Type - Twitter
const font = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

// Side Buttons Configuration
interface TwitterSidebarButton {
    title: string;
    icon: React.ReactNode;

}

// Side Buttons Initilization
const sidebarMenuItems : TwitterSidebarButton[] = [
  {
    title: 'Home',
    icon: <AiFillHome />,
  },
  {
    title: 'Explore',
    icon: <IoSearchOutline />,
  },
  {
    title: 'Notification',
    icon: <IoNotificationsOutline />,
  },
  {
    title: 'Messages',
    icon: <BiMessageDetail />,
  },
  {
    title: 'Grok',
    icon: <FaBrain />,
  },
  {
    title: 'Bookmarks',
    icon: <PiBookmarkSimple />,
  },
  {
    title: 'Communities',
    icon: <FaUserFriends />,
  },
  {
    title: 'Premium',
    icon: <FaXTwitter />,
  },
  {
    title: 'Verified Orgs',
    icon: <AiOutlineThunderbolt />,
  },
  {
    title: 'Profile',
    icon: <CiUser />,
  },
  {
    title: 'More',
    icon: <CiCircleMore />,
  },
]


export default function Home() {
  return (
    <div className="w-screen h-screen grid grid-cols-12 gap-4 lg:px-56 md:px-20 sm:px-8 px-4 relative">
      {/* Sidebar */}
      <div className="hidden md:block col-span-3">
        {/* Adjust alignment based on screen size */}
        <div className="flex flex-col items-start mt-4 pl-4 lg:items-start lg:pl-4"> {/* Left aligned for wide screens */}
          <FaXTwitter className="text-4xl hover:bg-gray-800 rounded-full p-2 cursor-pointer" />
        </div>
        <div className={`${font.variable} mt-6 pl-4 lg:pl-4`}> {/* Left aligned for wide screens */}
          <ul className="flex flex-col items-start space-y-4"> {/* Adjusted to align left */}
            {sidebarMenuItems.map((item) => (
              <li
                className="flex items-center hover:bg-gray-800 rounded-full py-2 px-2 w-fit focus:font-bold"
                key={item.title}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="hidden xl:block pl-4">{item.title}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden xl:block mt-6 pl-4 lg:pl-4"> {/* Left aligned for wide screens */}
          <button
            className={`${font.variable} text-xl bg-white text-black font-bold rounded-full px-16 py-3`}
          >
            Post
          </button>
        </div>
      </div>

      {/* Feed Section */}
      <div className="col-span-12 md:col-span-6 border-r-[1px] border-l-[1px] border-gray-800">
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
      </div>

      {/* Right Section */}
      <div className="hidden md:block col-span-3"></div>

      {/* Bottom Navigation Bar for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-700 z-50">
        <div className="flex justify-around items-center py-2 text-gray-500">
          <AiFillHome className="text-2xl hover:text-white hover:rounded-full hover:bg-gray-800 p-1" />
          <IoSearchOutline className="text-2xl hover:text-white hover:rounded-full hover:bg-gray-800 p-1" />
          <IoNotificationsOutline className="text-2xl hover:text-white hover:rounded-full hover:bg-gray-800 p-1" />
          <BiMessageDetail className="text-2xl hover:text-white hover:rounded-full hover:bg-gray-800 p-1" />
          <FaUserFriends className="text-2xl hover:text-white hover:rounded-full hover:bg-gray-800 p-1" />
        </div>
      </div>
    </div>
  );
}

