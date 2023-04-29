import React, { FC, FormEvent, useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import AddNoteModal from '../../components/header/AddNoteModal';
import NoteFilter from './NoteFilter';
import { NotesModel } from '../../components/interface/NotesModel';
import { v4 as uuidv4 } from 'uuid';

// NEXT ONE IS TO LET HIGHLIGHT CHANGE AND UPLOAD IT TO LOCAL STORAGE.

interface AppModel {
   addNotes: (e: FormEvent) => any | void;
   deleteNotes: (id: string) => any | void;
   handleTitle: (title: string) => any | void;
   handleContent: (content: string) => any | void;
   handleNoteHighlight: (highlight: boolean) => void;
   modalVisible: boolean;
   noteTitle: string;
   noteContent: string;
   noteHighlight: boolean;
   filteredSearchQuery: NotesModel[];
   saveEditNote: (id: string, title: string, content: string) => any | void;
   showModal: (value: boolean) => any | void;
   toggleHighlight: (id: string) => any | void;
}

const Home: FC<AppModel> = ({
   addNotes,
   deleteNotes,
   handleTitle,
   handleContent,
   handleNoteHighlight,
   modalVisible,
   filteredSearchQuery,
   noteTitle,
   noteContent,
   noteHighlight,
   saveEditNote,
   showModal,
   toggleHighlight,
}) => {
   const emptyArray: any = [];
   // Refs
   const titleRef = useRef<HTMLInputElement>();
   const contentRef = useRef<HTMLTextAreaElement>();

   return (
      <div className="w-full ">
         <NoteFilter
            notes={filteredSearchQuery}
            saveEditNote={saveEditNote}
            deleteNotes={deleteNotes}
            toggleHighlight={toggleHighlight}
         />
         <div className="flex flex-row-reverse">
            <button
               className="bottom-20 fixed rounded-full p-2 bg-[#e69c5e] transition-all duration-150 ease-linear"
               onClick={() => {
                  showModal(true);
               }}
            >
               <Icon
                  className="w-[32px] h-[32px]"
                  icon="material-symbols:add"
                  // color="#E7AB79"
                  color="#FFF"
                  // color="#16171D"
               />
            </button>
         </div>
         {/* This will be shown if noteModal is true */}
         {modalVisible && (
            <AddNoteModal
               addNotes={addNotes}
               handleTitle={handleTitle}
               handleContent={handleContent}
               handleNoteHighlight={handleNoteHighlight}
               noteTitle={noteTitle}
               noteContent={noteContent}
               noteHighlight={noteHighlight}
               showModal={showModal}
            />
         )}
      </div>
   );
};
// 1F2026

export default Home;
