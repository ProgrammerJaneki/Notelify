import React, { FormEvent, useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import AddNoteModal from '../../components/header/AddNoteModal';
import NoteFilter from './NoteFilter';
import { NotesModel } from '../../components/interface/NotesModel';
import { v4 as uuidv4 } from 'uuid';

// NEXT ONE IS TO LET HIGHLIGHT CHANGE AND UPLOAD IT TO LOCAL STORAGE.

const Home = () => {
   const emptyArray: any = [];
   // Refs
   const titleRef = useRef<HTMLInputElement>();
   const contentRef = useRef<HTMLTextAreaElement>();
   // States
   const [modalVisible, setModalVisible] = useState<boolean>(false);
   const [noteTitle, setNoteTitle] = useState<string>('');
   const [noteContent, setNoteContent] = useState<string>('');
   const [noteHighlight, setNoteHighlight] = useState<boolean>(false);
   const [query, setQuery] = useState('');
   // State for handling getItem from locastorage
   const [notes, setNotes] = useState<NotesModel[]>(
      // []
      () => {
         const storedNotes = localStorage.getItem('notelify_notes');
         if (storedNotes) {
            return JSON.parse(storedNotes);
         }
         return [];
      }
      // JSON.parse(localStorage.getItem('notelify_notes') || [])
   );

   // Local storage
   useEffect(() => {
      localStorage.setItem('notelify_notes', JSON.stringify(notes));
   }, [notes]);

   // Function to handle if modal is shown or not
   const showModal = (value: boolean) => {
      setModalVisible(value);
   };
   const handleTitle = (title: string) => {
      setNoteTitle(title);
   };
   const handleContent = (content: string) => {
      setNoteContent(content);
   };
   const handleNoteHighlight = (highlight: boolean) => {
      setNoteHighlight(highlight);
   };
   // const handleNoteTitle = ()
   const addNotes = (e: FormEvent) => {
      e.preventDefault();

      const newSetNote = [
         {
            id: uuidv4(),
            title: noteTitle,
            noteContent: noteContent,
            noteLabel: 'Design',
            date: new Date(),
            complete: false,
            highlight: noteHighlight,
         },
         ...notes,
      ];
      setNotes(newSetNote);
      setNoteTitle('');
      setNoteContent('');
      showModal(false);
   };

   const deleteNotes = (id: string) => {
      const newNotes = notes.filter((note) => {
         return note.id !== id;
      });
      setNotes(newNotes);
   };

   const toggleHighlight = (id: string) => {
      const newNotes = [...notes];
      const noteItem: any | void = newNotes.find(
         (noteItem) => noteItem.id === id
      );
      if (noteItem.id === id) {
         noteItem.highlight = !noteItem.highlight;
      }
      setNotes(newNotes);
   };

   return (
      <div className="w-full ">
         <NoteFilter
            notes={notes}
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
