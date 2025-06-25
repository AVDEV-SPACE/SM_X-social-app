// PopularTags.jsx sau PopularTags.tsx
import Image from "next/image";
import Link from "next/link";

const PopularTags = () => {
  return (
    <div className="p-2 rounded-2xl border-[1px] border-borderGray flex flex-col gap-4">
      <h1 className="text-xl font-bold text-textGrayLight">
        {"What's"} Happening
      </h1>
      
      {/* TREND EVENT */}
      <div className="flex gap-4">
        <div className="relative w-20 h-20 rounded-xl overflow-hidden">
          {/* Asigură-te că acest fișier există în public/general cu extensia corectă (.png sau .jpg) */}
          <Image 
            src="/general/cover.jpg" 
            alt="event"
            width={120}
            height={120}
          />
        </div>
        <div className="flex-1">
          <h2 className="font-bold text-textGrayLight">
            Nadal v Federer Grand Slam
          </h2>
          <span className="text-sm text-textGray">Last Night</span>
        </div>
      </div>
      
      {/* TOPICS - Componente repetitive optimizate */}
      {[1, 2, 3, 4].map((item, index) => (
        <div key={index} className="p-2 rounded-xl hover:bg-[#181818] transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-textGray text-sm">Technology • Trending</span>
            <img src="/icons/infoMore.svg" alt="info" width={16} height={16} />
          </div>
          <h2 className="text-textGrayLight font-bold">OpenAI</h2>
          <span className="text-textGray text-sm">20K posts</span>
        </div>
      ))}
      
      <Link href="/" className="text-iconBlue w-full hover:bg-black/80">
        Show More
      </Link>
    </div>
  );
};

export default PopularTags;