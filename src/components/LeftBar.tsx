import Image from "next/image";
import ImageU from "./ImageU";
import Link from "next/link";
import { useState } from "react";
import { useClerk, useUser } from "@clerk/nextjs";

const menuList = [
  { id: 1, name: "Homepage", link: "/", icon: "home.svg" },
  { id: 2, name: "Explore", link: "/", icon: "explore.svg" },
  { id: 3, name: "Notification", link: "/", icon: "notification.svg" },
  { id: 4, name: "Messages", link: "/", icon: "message.svg" },
  { id: 5, name: "Grok", link: "/", icon: "bookmark.svg" },
  { id: 9, name: "Profile", link: "/", icon: "profile.svg" },
  { id: 10, name: "More", link: "/", icon: "more.svg" },
];

const LeftBar = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [showModal, setShowModal] = useState(false);

  const fullName = user?.fullName || "User";
  const username = user?.username || user?.primaryEmailAddress?.emailAddress?.split("@")[0] || "user";

  return (
    <div className="h-screen sticky top-0 flex flex-col justify-between pt-2 py-3">
      {/* LOGO + MENU */}
      <div className="flex flex-col gap-2 text-lg items-center xxl:items-start">
        <Link href="/" className="p-2 rounded-full hover:bg-[#181818] transition">
          <Image src="/icons/t-way_social3.png" alt="logo" width={28} height={48} />
        </Link>

        <div className="flex flex-col gap-1">
          {menuList.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className="flex items-center gap-4 p-3 rounded-full hover:bg-[#181818] transition text-white font-medium"
            >
              <Image src={`/icons/${item.icon}`} alt={item.name} width={26} height={26} />
              <span className="hidden xxl:block">{item.name}</span>
            </Link>
          ))}
        </div>

        <Link
          href="/compose/post"
          className="hidden xxl:flex items-center justify-center bg-white text-black rounded-full font-bold py-3 px-8 mt-2 hover:bg-gray-200 transition"
        >
          Post
        </Link>

        <div className="xxl:hidden w-full flex justify-center mt-2">
          <Link
            href="/compose/post"
            className="bg-white text-black rounded-full p-3 hover:bg-gray-200 transition"
          >
            <Image src="/icons/post.svg" alt="post" width={24} height={24} />
          </Link>
        </div>
      </div>

      {/* USER BUTTON - DYNAMIC */}
      <div
        onClick={() => setShowModal(true)}
        className="flex items-center gap-3 p-2 rounded-full hover:bg-[#181818] transition cursor-pointer relative"
      >
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <ImageU src={user?.imageUrl || "/general/avatar.png"} alt="user" w={40} h={40} tr />
        </div>
        <div className="hidden xxl:block">
          <p className="font-bold text-white">{fullName}</p>
          <p className="text-sm text-textGray">@{username}</p>
        </div>
        <div className="hidden xxl:block pr-2 ml-auto">
          <span className="text-xl text-textGray">...</span>
        </div>

        {/* PROFILE MODAL --------(SIGN OUT)------- */}
        {showModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center xxl:items-center"
            onClick={() => setShowModal(false)}
          >
            <div
              className="bg-[#181818] rounded-t-2xl xxl:rounded-2xl w-full xxl:w-96 p-4 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <ImageU src={user?.imageUrl || "/general/avatar.png"} alt="user" w={48} h={48} tr />
                </div>
                <div>
                  <p className="font-bold text-white">{fullName}</p>
                  <p className="text-sm text-textGray">@{username}</p>
                </div>
              </div>

              <button
                onClick={() => signOut(() => window.location.href = "/")}
                className="w-full text-left p-3 rounded-lg hover:bg-[#202020] transition text-white"
              >
                Log out @{username}
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="w-full text-left p-3 rounded-lg hover:bg-[#202020] transition text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftBar;