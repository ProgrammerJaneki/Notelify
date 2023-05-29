import React, { useState, useCallback, useMemo } from 'react';
import { NotesModel } from '../../../components/interface/NotesModel';
import Notes from './Notes';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

interface NoteListModel {
   notes: NotesModel[];
   activeButton: number;
   deleteNotes: (id: string) => any | void;
   saveEditNote: (id: string, title: string, content: string) => any | void;
   sortedNotes: any;
   toggleHighlight: (id: string) => any | void;
}

const MotionWrapper = ({ content }: { content: React.ReactNode }) => (
   <React.Fragment>
      <motion.div
         key="fullNote"
         initial={{
            y: '50%',
            opacity: 0,
            scale: 0.5,
         }}
         animate={{ y: 0, opacity: 1, scale: 1 }}
         exit={{ opacity: 0 }}
         transition={{
            duration: 0.3,
            delay: 0.2,
            ease: [0, 0.71, 0.2, 1.01],
         }}
      >
         {content}
      </motion.div>
   </React.Fragment>
);

const NoteList = ({
   notes,
   activeButton,
   deleteNotes,
   saveEditNote,
   sortedNotes,
   toggleHighlight,
}: NoteListModel) => {
   const [utilities, setUtilities] = useState<boolean>(false);
   const [activeID, setActiveID] = useState<string>('');

   // Handle Functions
   const handleShowItem = (id: string) => {
      if (activeID === id) {
         //
      } else {
         // another conditiona
         setUtilities(true);
         setActiveID(id);
      }
   };
   // Memoize the sortedNotes
   // to avoid re-rendering the filter function everytime we filter between all notes, complete & highlight
   const sortedNotesMemo = useMemo(() => {
      if (activeButton == 1) {
         return sortedNotes.filter((note: NotesModel) => note.complete);
      } else if (activeButton == 2) {
         return sortedNotes.filter((note: NotesModel) => note.highlight);
      } else {
         return sortedNotes;
      }
   }, [notes, activeButton]);

   return (
      <>
         {/* All Notes */}
         {notes.length === 0 ? (
            <h2>Empty</h2>
         ) : (
            <>
               {/* Notes */}
               {activeButton === 0 && (
                  <>
                     {sortedNotesMemo.map((items: NotesModel) => {
                        return (
                           <MotionWrapper
                              key={items.id}
                              content={
                                 <Notes
                                    saveEditNote={saveEditNote}
                                    deleteNotes={deleteNotes}
                                    notes={items}
                                    activeId={activeID}
                                    handleShowItem={handleShowItem}
                                    utilities={utilities}
                                    toggleHighlight={toggleHighlight}
                                 />
                              }
                           ></MotionWrapper>
                        );
                     })}
                  </>
               )}
               {/* Completed */}
               {activeButton === 1 && (
                  <>
                     {sortedNotesMemo.length > 0 ? (
                        sortedNotesMemo.map((items: NotesModel) => {
                           return (
                              <>
                                 <React.Fragment key={items.id}>
                                    <motion.div
                                       key="fullNote"
                                       initial={{
                                          y: '50%',
                                          opacity: 0,
                                          scale: 0.5,
                                       }}
                                       animate={{
                                          y: 0,
                                          opacity: 1,
                                          scale: 1,
                                       }}
                                       exit={{ opacity: 0 }}
                                       transition={{
                                          duration: 0.3,
                                          delay: 0.2,
                                          ease: [0, 0.71, 0.2, 1.01],
                                       }}
                                    >
                                       <Notes
                                          // key={items.id}
                                          saveEditNote={saveEditNote}
                                          deleteNotes={deleteNotes}
                                          notes={items}
                                          activeId={activeID}
                                          handleShowItem={handleShowItem}
                                          utilities={utilities}
                                          toggleHighlight={toggleHighlight}
                                       />
                                    </motion.div>
                                    {/* // </AnimatePresence> */}
                                 </React.Fragment>
                              </>
                           );
                        })
                     ) : (
                        <h2>Empty</h2>
                     )}
                  </>
               )}
               {/* Highlights */}
               {activeButton === 2 && (
                  <>
                     {sortedNotesMemo.length > 0 ? (
                        sortedNotesMemo.map((items: NotesModel) => {
                           return (
                              <>
                                 <MotionWrapper
                                    key={items.id}
                                    content={
                                       <Notes
                                          saveEditNote={saveEditNote}
                                          deleteNotes={deleteNotes}
                                          notes={items}
                                          activeId={activeID}
                                          handleShowItem={handleShowItem}
                                          utilities={utilities}
                                          toggleHighlight={toggleHighlight}
                                       />
                                    }
                                 ></MotionWrapper>
                              </>
                           );
                        })
                     ) : (
                        <h2>Empty</h2>
                     )}
                  </>
               )}
            </>
         )}
      </>
   );
};

export default NoteList;
