// components/RightBar.tsx
import Link from "next/link";
import PopularTags from "./PopularTags";
import Search from "./Search";
import Recommendations from "./Recommendations";

const RightBar = () => {
  return (
    <div className="hidden lg:block w-80 xl:w-96 sticky top-0 h-screen pt-4 pl-4">
      <div className="space-y-4">
        <Search />
        <PopularTags />
        <Recommendations />
        
        <footer className="text-textGray text-xs space-x-3 flex flex-wrap">
          <Link href="/" className="hover:underline">Terms of Service</Link>
          <Link href="/" className="hover:underline">Privacy Policy</Link>
          <Link href="/" className="hover:underline">Cookie Policy</Link>
          <Link href="/" className="hover:underline">Accessibility</Link>
          <Link href="/" className="hover:underline">Ads Info</Link>
          <span>© 2025 L Corp.</span>
        </footer>
      </div>
    </div>
  );
};

export default RightBar;