import Image from "next/image"; // Am schimbat importul, dacă vrei sa folosesti Next.js Image

const Search = () => {
  return (
    <div className='bg-inputGray py-2 px-4 flex items-center gap-4 rounded-full'>
      {/* Aici folosești acum un tag <img> direct */}
      <img src="/icons/explore.svg" alt="search" width={16} height={16} />
      <input 
        type="text" 
        placeholder="Search" 
        className="bg-transparent outline-none placeholder:text-textGray flex-1"
      />
    </div>
  );
};

export default Search;