import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { Link, generatePath, useNavigate, useParams } from 'react-router-dom';
import { NotesModel } from '../../../components/interface/NotesModel';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'fecha';

interface NoteListModel {
   deleteNotes: (id: string) => any | void;
   notes: NotesModel;
   toggleHighlight: (id: string) => any | void;
}

const noteStyle = {
   defaultStyle:
      'bg-[#16171d] hover:bg-[#1f2026] border-[#E69C5E] p-4 rounded-lg transition-all duration-150 ease-linear',
   activeNoteStyle: 'bg-[#1f2026] ',
};

const Notes = ({ deleteNotes, notes, toggleHighlight }: NoteListModel) => {
   const iconWidth: string = '30';
   const iconHeight: string = '30';
   const [utilities, setUtilities] = useState<boolean>(false);

   const navigate = useNavigate();
   // Edit Notes
   const [noteTitle, setNoteTitle] = useState<string>(notes.title);
   const [noteContent, setNoteContent] = useState<string>(notes.noteContent);
   const titleRef = useRef<any>(null);

   useEffect(() => {
      // we'll only call this when the input box that has titleRef is rendered
      titleRef.current && titleRef.current.focus();
   }, [utilities]);

   const [bookmark, setBookmark] = useState<boolean>(false);
   let currDate: string = new Date().toLocaleString();
   // let formattedDate = format(new Date(2015, 10, 20), 'isoDate');
   let formattedDate = format(new Date(notes.date), 'isoDate');

   // ✅Sort
   // Handles✅
   const handleDeleteNote = () => {
      deleteNotes(notes.id);
   };
   const handleToggleHighlight = () => {
      console.log('Title: ', notes.title);
      toggleHighlight(notes.id);
   };
   const goToNotes = (notes: any) => {
      console.log(notes);
   };
   return (
      <div>
         {/* Double click to route */}
         <div
            className={`${noteStyle.defaultStyle}
               ${utilities ? noteStyle.activeNoteStyle : ''}`}
            //    className="
            // bg-[#16171d] hover:bg-[#1f2026] border-[#E69C5E] cursor-pointer p-4 rounded-lg transition-all duration-150 ease-linear
            // "
         >
            {/* Top */}
            <div className="flex justify-between items-start  mb-2 ">
               {/* Left */}
               {!utilities ? (
                  <span className="font-bold text-lg max-w-[80%]">
                     {notes.title}
                  </span>
               ) : (
                  <input
                     type="text"
                     className="bg-transparent font-bold focus:outline-none text-lg"
                     value={noteTitle}
                     ref={titleRef}
                     onChange={(e) => {
                        setNoteTitle(e.currentTarget.value);
                     }}
                  />
               )}
               {/* Right */}
               <div className="flex space-x-2">
                  <button
                     className="hover:text-[#E69C5E] text-[#DEDEDE] mb-0 transition-all duration-150 ease-linear"
                     onClick={() => {
                        handleToggleHighlight();
                        // setBookmark(!bookmark);
                     }}
                     type="button"
                  >
                     {!notes.highlight && (
                        <Icon
                           className=" "
                           icon="material-symbols:bookmark-outline"
                           color=""
                           // color={`${bookmark ? '#E69C5E' : '#DEDEDE' }`}
                           width={iconWidth}
                           height={iconHeight}
                        />
                     )}
                     {notes.highlight && (
                        <Icon
                           icon="material-symbols:bookmark-rounded"
                           color="#e69c5e"
                           width={iconWidth}
                           height={iconHeight}
                        />
                     )}
                  </button>
                  <AnimatePresence>
                     {utilities && (
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
            <div
               className="mb-4"
               // Click
            >
               {!utilities ? (
                  <h2
                     className="cursor-pointer text-[#7B7A91] "
                     onClick={() => {
                        setUtilities(true);
                     }}
                  >
                     {notes.noteContent}
                  </h2>
               ) : (
                  <input
                     type="text"
                     className="bg-transparent text-[#7B7A91] focus:outline-none "
                     value={noteContent}
                     onChange={(e) => {
                        setNoteContent(e.currentTarget.value);
                     }}
                  />
               )}
            </div>

            {/* Bottom */}
            <div className="text-sm text-[#66687d] flex justify-between">
               <span>{notes.noteLabel}</span>
               <span>{formattedDate}</span>
               {/* <span>2022-12-03</span> */}
            </div>

            {utilities && (
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
                        setUtilities(false);
                     }}
                  >
                     Cancel
                  </button>
                  <button className=" bg-[#E69C5E] hover:bg-[#E69C5E]/80 text-[#FFFFFF]  px-6 rounded-md transition-all duration-150 ease-linear">
                     Save
                  </button>
               </motion.div>
            )}
         </div>
      </div>
   );
};

export default Notes;

// GONNA CHANGE THE DELETE TO THE NOTES INSTEAD
// console.log('Note ID: ', notes.id),
//    navigate(`notes/${notes.title}`, {
//       state: {
//          id: notes.id,
//          title: notes.title,
//          content: notes.noteContent,
//          highlight: notes.highlight,
//          label: notes.noteLabel,
//          date: notes.date,
//       },
//    });
