import React, { useState } from 'react';
import Home from './Home';
import FilterButton from '../../components/FilterButton';
import NoteList from './NoteComponents/NoteList';
import { NotesModel } from '../../components/interface/NotesModel';
import { Icon } from '@iconify/react';
import { format } from 'fecha';

interface NoteContentModel {
   saveEditNote: (id: string, title: string, content: string) => any | void;
   deleteNotes: (id: string) => any | void;
   notes: NotesModel[];
   toggleHighlight: (id: string) => any | void;
}

const NoteFilter = ({
   saveEditNote,
   deleteNotes,
   notes,
   toggleHighlight,
}: NoteContentModel) => {
   const [activeButton, setActiveButton] = useState<number>(0);
   const defaultSortOrder = 'Newest - Oldest';
   const secondSortOrder = 'Oldest - Newest';
   const [sortPopUp, setSortPopUp] = useState<boolean>(false);
   const [itemsOrder, setItemsOrder] = useState<string>(defaultSortOrder); // descending order
   const [ascendingOrder, setAscendingOrder] = useState<boolean>(false);

   // Functions
   const fake = (arr: any[]) => {
      return arr;
   };
   const sortByDateTime = (note: any[]) => {
      // Sort by Date first
      note.sort((a: any, b: any) => {
         const fDate = new Date(a.date);
         const sDate = new Date(b.date);
         if (fDate > sDate) {
            return ascendingOrder ? 1 : -1;
         } else if (fDate < sDate) {
            return !ascendingOrder ? 1 : -1;
         } else {
            return 0;
         }
      });
      // Sort by Time
      note.sort((a: any, b: any) => {
         const firstTime = new Date(a.date).getTime();
         const secondTime = new Date(b.date).getTime();
         return ascendingOrder
            ? firstTime - secondTime
            : secondTime - firstTime;
      });

      return note;
   };

   const sortedNotes = sortByDateTime(notes);

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
                           onClick={() => {
                              setItemsOrder(defaultSortOrder);
                              setAscendingOrder(false);
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
                              setAscendingOrder(true);
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
                  saveEditNote={saveEditNote}
                  sortedNotes={sortedNotes}
                  toggleHighlight={toggleHighlight}
               />
            </div>
         </div>
      </div>
   );
};

export default NoteFilter;
