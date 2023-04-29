import React, { ChangeEvent, MutableRefObject, RefObject } from 'react';
import { NavLink } from 'react-router-dom';
import logo from './../../assets/svgs/logo.svg';
import SearchBar from './SearchBar';
import Bin from './Bin';
import AddNoteModal from './AddNoteModal';

interface MainHeaderModel {
   handleSetSearchQuery: (event: ChangeEvent<HTMLInputElement>) => void;
   searchQuery: string;
}

const MainHeader = ({ handleSetSearchQuery, searchQuery }: MainHeaderModel) => {
   const handleSearchBarProps = {
      handleSetSearchQuery,
      searchQuery,
   };

   return (
      <nav className=" py-4 mb-2.5 border-[#808080]">
         <ul className="flex items-center justify-between gap-x-2">
            <li className="">
               <NavLink to="/">
                  <img src={logo} alt="" />
               </NavLink>
               {/* <h2 className="py-2.5">Main Header</h2> */}
               {/* <hr className="bg-[#DDE3E3]" /> */}
            </li>
            <li className="leading-none">
               <ul className="flex items-center  leading-none gap-x-3 ">
                  <li className="">
                     <SearchBar {...handleSearchBarProps} />
                  </li>
                  <li className="">
                     <Bin />
                  </li>
                  {/* <li className="">
                     <AddNoteModal />
                  </li> */}
               </ul>
            </li>
         </ul>
      </nav>
   );
};

export default MainHeader;
