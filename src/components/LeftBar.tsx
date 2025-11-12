// components/LeftBar.tsx
import Image from "next/image";
import ImageU from "./ImageU";
import Link from "next/link";

const menuList = [
  { id: 1, name: "Homepage", link: "/", icon: "home.svg" },
  { id: 2, name: "Explore", link: "/", icon: "explore.svg" },
  { id: 3, name: "Notification", link: "/", icon: "notification.svg" },
  { id: 4, name: "Messages", link: "/", icon: "message.svg" },
  { id: 5, name: "Bookmarks", link: "/", icon: "bookmark.svg" },
  { id: 6, name: "Jobs", link: "/", icon: "job.svg" },
  { id: 7, name: "Communities", link: "/", icon: "community.svg" },
  { id: 8, name: "Premium", link: "/", icon: "logo.svg" },
  { id: 9, name: "Profile", link: "/", icon: "profile.svg" },
  { id: 10, name: "More", link: "/", icon: "more.svg" },
];

const LeftBar = () => {
  return (
    <div className="h-screen sticky top-0 flex flex-col justify-between pt-2 py-3">
      {/* LOGO + MENU */}
      <div className="flex flex-col gap-2 text-lg items-center xxl:items-start">
        <Link href="/" className="p-2 rounded-full hover:bg-[#181818] transition">
          <Image src="/icons/logo.svg" alt="logo" width={28} height={28} />
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

      {/* USER */}
      <div className="flex items-center gap-3 p-2 rounded-full hover:bg-[#181818] transition cursor-pointer">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <ImageU src="/general/avatar.png" alt="user" w={40} h={40} tr />
        </div>
        <div className="hidden xxl:block">
          <p className="font-bold text-white">user Dev</p>
          <p className="text-sm text-textGray">@user</p>
        </div>
        <div className="hidden xxl:block ml-auto">
          <span className="text-xl text-textGray">...</span>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;