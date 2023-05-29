import React, { ChangeEvent, RefObject } from 'react';
import { Icon } from '@iconify/react';

interface SearchBarModel {
   handleSetSearchQuery: (event: ChangeEvent<HTMLInputElement>) => void;
   searchQuery: string;
}

const SearchBar = ({ handleSetSearchQuery, searchQuery }: SearchBarModel) => {
   return (
      <div className="bg-transparent bg-[#1f2026] rounded-md flex items-center gap-x-2 py-3 sm:py-2 px-4 w-full">
         <div className="block w-full ">
            <input
               className="bg-transparent placeholder-[#7B7A91] focus:outline-none w-full"
               type="text"
               placeholder="Search a note"
               value={searchQuery}
               onChange={handleSetSearchQuery}
            />
         </div>
         <button className="hover:bg-[#1F2026] rounded-full ">
            <Icon icon="uil:search" color="#7B7A91" width="20" height="20" />
         </button>
      </div>
   );
};

export default SearchBar;
