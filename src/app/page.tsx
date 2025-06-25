import Feed from "@/components/Feed";
import Share from "@/components/Share";
import Link from "next/link";


const Homepage = () => {
  return <div className="">
    <div className='px-4 pt-4 flex justify-between text-textGray font-bold border-b-[1px] border-borderGray'>

      <div className="span boder border-r-borderGray w-1/2 flex justify-center items-center">
      <Link className="w-1/2 pb-3" href="/"> 
      <span className="border-b-4 border-iconBlue">For you</span>
      </Link>
      </div>
      
      <div className="span w-1/2 flex justify-center items-center">
      <Link className="w-1/2 pb-3" href="/"> 
      <span className="border-b-4 border-iconBlue">Following</span>
      </Link>
      </div>

    </div>
    <Share/>
    <Feed/>
  </div>;
};

export default Homepage;
