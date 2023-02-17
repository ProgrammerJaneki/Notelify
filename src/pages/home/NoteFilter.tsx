import React, { useState } from 'react';
import Home from './Home';
import FilterButton from '../../components/FilterButton';
import NoteList from './NoteComponents/NoteList';
import { NotesModel } from '../../components/interface/NotesModel';
import { Icon } from '@iconify/react';
import { format } from 'fecha';

interface NoteContentModel {
   deleteNotes: (id: string) => any | void;
   notes: NotesModel[];
   toggleHighlight: (id: string) => any | void;
}

const NoteFilter = ({
   deleteNotes,
   notes,
   toggleHighlight,
}: NoteContentModel) => {
   const [activeButton, setActiveButton] = useState<number>(0);
   const defaultSortOrder = 'Newest - Oldest';
   const secondSortOrder = 'Oldest - Newest';
   const [sortPopUp, setSortPopUp] = useState<boolean>(false);
   const [itemsOrder, setItemsOrder] = useState<string>(defaultSortOrder);

   return (
      <div className="pb-5 space-y-5 ">
         <div className="bg-[#1F2026] text-[#fff] flex items-center justify-between p-2 rounded-xl">
            <FilterButton
               activeButton={activeButton}
               filterButtonName="Notes"
               filterButtonFunction={setActiveButton}
               filterButtonOrder={0}
            />
            <FilterButton
               activeButton={activeButton}
               filterButtonName="Completed"
               filterButtonFunction={setActiveButton}
               filterButtonOrder={1}
            />
            <FilterButton
               activeButton={activeButton}
               filterButtonName="Highlights"
               filterButtonFunction={setActiveButton}
               filterButtonOrder={2}
            />
         </div>
         <div className="space-y-4">
            {/* Header */}
            <div className="flex justify-between ">
               <h2>List Notes</h2>
               <button
                  className="relative text-[#787A91] flex items-center gap-x-2 z-50"
                  onClick={() => {
                     setSortPopUp(!sortPopUp);
                  }}
               >
                  <span className="pl-2 text-sm">{itemsOrder}</span>
                  <Icon
                     icon="carbon:caret-sort"
                     color="#DEDEDE"
                     width="12"
                     height="12"
                  />
                  {/* pop up */}
                  {sortPopUp && (
                     <div className="flex flex-col bg-[#16171D] border border-[#101014] text-base py-1 absolute rounded-md top-6 -left-2 w-[8rem] h-20">
                        <span
                           className={`${'hover:bg-[#1F2026] py-1 px-2 transition-all duration-150 ease-linear'}
                              ${
                                 itemsOrder === defaultSortOrder
                                    ? 'bg-[#1F2026]'
                                    : ''
                              }`}
                           // className="
                           // hover:bg-[#1F2026] py-1 px-2 transition-all duration-150 ease-linear
                           // "
                           onClick={() => {
                              setItemsOrder(defaultSortOrder);
                           }}
                        >
                           {defaultSortOrder}
                        </span>
                        <span
                           className={`${'hover:bg-[#1F2026] py-1 px-2 transition-all duration-150 ease-linear'}
                              ${
                                 itemsOrder === secondSortOrder
                                    ? 'bg-[#1F2026]'
                                    : ''
                              }`}
                           onClick={() => {
                              setItemsOrder(secondSortOrder);
                           }}
                        >
                           {secondSortOrder}
                        </span>
                     </div>
                  )}
               </button>
            </div>
            {/* note list */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
               <NoteList
                  notes={notes}
                  activeButton={activeButton}
                  deleteNotes={deleteNotes}
                  toggleHighlight={toggleHighlight}
               />
            </div>
         </div>
      </div>
   );
};

export default NoteFilter;
