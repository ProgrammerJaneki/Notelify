import React from 'react';
import { Icon } from '@iconify/react';

const SearchBar = () => {
   return (
      <div className="flex">
         <button className="hover:bg-[#1F2026] rounded-full p-2 ">
            <Icon icon="uil:search" color="#dedede" width="24" height="24" />
         </button>
      </div>
   );
};

export default SearchBar;
