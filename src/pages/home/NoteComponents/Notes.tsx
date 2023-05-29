import React, { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Link, generatePath, useNavigate, useParams } from 'react-router-dom';
import { NotesModel } from '../../../components/interface/NotesModel';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'fecha';

import useAutosizeTextArea from '../../../components/hooks/useAutosizeTextArea';

interface NoteListModel {
   saveEditNote: (id: string, title: string, content: string) => any | void;
   deleteNotes: (id: string) => any | void;
   notes: NotesModel;
   activeId: string;
   handleShowItem: (id: string) => any | void;
   utilities: boolean;
   toggleHighlight: (id: string) => any | void;
}

const noteStyle = {
   defaultStyle:
      'bg-[#16171d] hover:bg-[#1f2026] border-[#E69C5E] p-4 rounded-lg   transition-all duration-150 ease-linear',
   activeNoteStyle: 'bg-[#1f2026] ',
};

const Notes = ({
   saveEditNote,
   deleteNotes,
   notes,
   activeId,
   handleShowItem,
   utilities,
   toggleHighlight,
}: NoteListModel) => {
   const iconWidth: string = '30';
   const iconHeight: string = '30';
   // const [utilities, setUtilities] = useState<boolean>(false);

   const navigate = useNavigate();
   // Edit Notes
   const [noteTitle, setNoteTitle] = useState<string>(notes.title);
   const [noteContent, setNoteContent] = useState<string>(notes.noteContent);
   const [noteHighlight, setNoteHighlight] = useState<boolean>(notes.highlight);
   // Refs
   const titleRef = useRef<HTMLTextAreaElement>(null);

   useAutosizeTextArea(titleRef.current, noteTitle);

   // Handles
   const handleTitleChange = (
      event: React.ChangeEvent<HTMLTextAreaElement>
   ) => {
      const value = event.target.value;

      setNoteTitle(value);
   };

   useEffect(() => {
      // we'll only call this when the input box that has titleRef is rendered
      titleRef.current && titleRef.current.focus();
   }, [utilities]);

   const [bookmark, setBookmark] = useState<boolean>(false);

   // ✅Sort
   // Handles✅
   const handleSaveEditNote = () => {
      saveEditNote(notes.id, noteTitle, noteContent);
      // setUtilities(false);
   };
   const handleDeleteNote = () => {
      deleteNotes(notes.id);
   };
   const handleChangeItems = () => {
      handleShowItem(notes.id);
      setNoteTitle(notes.title);
      setNoteContent(notes.noteContent);
   };
   const handleToggleHighlight = () => {
      toggleHighlight(notes.id);
   };
   const handleFormattedDate = useMemo(() => {
      return (notesDate: string) => {
         const date = new Date(notesDate); // Parse date from string
         let formattedDate = format(date, 'YYYY-MM-DD [|] HH:mm A');
         return formattedDate;
      };
   }, [notes]);

   return (
      <div>
         <div
            className={`${noteStyle.defaultStyle}
               ${utilities ? noteStyle.activeNoteStyle : ''}`}
         >
            {/* Top */}
            <div className="flex justify-between items-start  mb-2 ">
               {activeId !== notes.id ? (
                  <span className="break-words font-bold text-lg min-h-[2rem] max-h-[2rem] max-w-[80%] overflow-hidden">
                     {notes.title}
                  </span>
               ) : (
                  <textarea
                     name=""
                     id=""
                     rows={1}
                     value={noteTitle}
                     ref={titleRef}
                     onChange={handleTitleChange}
                     className="bg-transparent focus:outline-none w-full max-h-[80px] resize-none"
                  ></textarea>
               )}
               {/* Right */}
               <div className="flex space-x-2">
                  <button
                     className="hover:text-[#E69C5E] text-[#DEDEDE] mb-0 transition-all duration-150 ease-linear"
                     onClick={() => {
                        handleToggleHighlight();
                        setNoteHighlight(!noteHighlight);
                     }}
                     type="button"
                  >
                     {!noteHighlight && (
                        <Icon
                           className=" "
                           icon="material-symbols:bookmark-outline"
                           color=""
                           width={iconWidth}
                           height={iconHeight}
                        />
                     )}
                     {noteHighlight && (
                        <Icon
                           icon="material-symbols:bookmark-rounded"
                           color="#e69c5e"
                           width={iconWidth}
                           height={iconHeight}
                        />
                     )}
                  </button>
                  <AnimatePresence>
                     {activeId === notes.id && (
                        <motion.button
                           key="delete"
                           initial={{ y: '50%', opacity: 0, scale: 0.5 }}
                           animate={{ y: 0, opacity: 1, scale: 1 }}
                           exit={{ opacity: 0 }}
                           transition={{
                              duration: 0.1,
                              delay: 0.2,
                              ease: [0, 0.71, 0.2, 1.01],
                           }}
                           className="hover:text-[#E69C5E] transition-all duration-150"
                           onClick={() => {
                              handleDeleteNote();
                           }}
                        >
                           <Icon
                              icon="material-symbols:delete-outline-rounded"
                              color=""
                              width={iconWidth}
                              height={iconHeight}
                           />
                        </motion.button>
                     )}
                  </AnimatePresence>
               </div>
            </div>

            {/* Body */}
            <div className="items-center mb-4 md:min-h-[4.5rem] max-h-[4.5rem] overflow-hidden">
               {activeId !== notes.id ? (
                  <p
                     className="cursor-pointer break-words text-[#7B7A91] min-h-[4rem]"
                     onClick={() => {
                        handleChangeItems();
                     }}
                  >
                     {notes.noteContent}
                  </p>
               ) : (
                  <textarea
                     className="bg-transparent focus:outline-none w-full resize-none"
                     name=""
                     id=""
                     rows={3}
                     value={noteContent}
                     onChange={(e) => {
                        setNoteContent(e.currentTarget.value);
                     }}
                  ></textarea>
               )}
            </div>

            {/* Bottom */}
            <div className="text-sm text-[#66687d] flex justify-between ">
               <span>{notes.noteLabel}</span>
               <span>{handleFormattedDate(notes.date)}</span>
               {/* <span>2022-12-03</span> */}
            </div>

            {/* Get the active ID */}
            {utilities && activeId === notes.id && (
               <motion.div
                  key="save"
                  initial={{ y: '50%', opacity: 0, scale: 0.5 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                     duration: 0.3,
                     delay: 0.2,
                     ease: [0, 0.71, 0.2, 1.01],
                  }}
                  className="border-[#e6e6e6] font-bold gap-x-4 flex justify-end mt-6 pt-4"
               >
                  <button
                     className="bg-[#282930]/70  text-[#d7d7d7] py-[0.4rem] px-5 hover:bg-[#282930] rounded-md transition-all duration-150 ease-linear"
                     onClick={() => {
                        handleShowItem('');
                        handleChangeItems();
                     }}
                  >
                     Cancel
                  </button>
                  <button
                     className=" bg-[#E69C5E] hover:bg-[#E69C5E]/80 text-[#FFFFFF]  px-6 rounded-md transition-all duration-150 ease-linear"
                     onClick={() => {
                        handleSaveEditNote();
                        handleShowItem('');
                     }}
                  >
                     Save
                  </button>
               </motion.div>
            )}
         </div>
      </div>
   );
};

export default Notes;
