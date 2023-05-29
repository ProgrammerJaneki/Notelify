import React, { ChangeEvent, MutableRefObject, RefObject } from 'react';
import { NavLink } from 'react-router-dom';
import logo from './../../assets/svgs/logo.svg';
import SearchBar from './SearchBar';
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
         <ul className="flex flex-col sm:flex-row sm:items-center justify-between gap-x-2">
            <li className="">
               <NavLink to="/">
                  <img src={logo} alt="" />
               </NavLink>
            </li>
            <li className="leading-none pt-8 sm:pt-0 ">
               <ul className="flex items-center  leading-none gap-x-3 ">
                  <li className="w-full">
                     <SearchBar {...handleSearchBarProps} />
                  </li>
               </ul>
            </li>
         </ul>
      </nav>
   );
};

export default MainHeader;
