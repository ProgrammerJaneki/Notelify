import React from 'react';
import Auth from '../utilities/auth';

// Delete later
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../components/config/notelify-firebase';
import { NotesModel } from '../components/interface/NotesModel';
import {
   collection,
   getDocs,
   addDoc,
   deleteDoc,
   updateDoc,
   doc,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'fecha';

const Trash = () => {
   // const [noteTitle, setNoteTitle] = useState<string>('');
   // const [noteContent, setNoteContent] = useState<string>('');
   // const [highlight, setNoteHighlight] = useState<boolean>(false);
   // const [notesList, setNotesList] = useState<NotesModel[]>([]);

   // const notesRef = collection(db, 'notes');
   // const [updatedNoteTitle, setUpdatedNoteTitle] = useState<string>('');

   // useEffect(() => {
   //    const getNotes = async () => {
   //       try {
   //          const data = await getDocs(notesRef);
   //          const filteredData: NotesModel[] = data.docs.map((doc) => ({
   //             id: doc.id,
   //             ...doc.data(),
   //          })) as NotesModel[];
   //          setNotesList(filteredData);
   //       } catch (err) {
   //          console.log(err);
   //       }
   //    };
   //    getNotes();
   // }, [notesRef]);

   // const addNote = async () => {
   //    const newNote = {
   //       title: noteTitle,
   //       noteContent: noteContent,
   //       noteLabel: 'Design',
   //       date: new Date().toISOString(),
   //       complete: false,
   //       highlight: highlight,
   //    };
   //    try {
   //       const docRef = await addDoc(notesRef, newNote);
   //       const newNoteWithId = {
   //          ...newNote,
   //          id: docRef.id,
   //       };
   //       setNotesList([...notesList, newNoteWithId]);
   //    } catch (err) {
   //       console.log(err);
   //    }
   // };

   // const updateNote = async (noteID: string) => {
   //    const noteDoc = doc(db, 'notes', noteID);
   //    try {
   //       await updateDoc(noteDoc, { title: updatedNoteTitle });
   //    } catch (err) {
   //       console.log(err);
   //    }
   // };

   // const deleteNote = async (noteID: string) => {
   //    const deleteNoteRef = doc(db, 'notes', noteID);
   //    try {
   //       await deleteDoc(deleteNoteRef);
   //       const newNotes = notesList.filter((note) => note.id !== noteID);
   //       setNotesList(newNotes);
   //    } catch (err) {
   //       console.log(err);
   //    }
   // };

   // Formats date
   // const handleFormattedDate = (notesDate: string) => {
   //    const date = new Date(notesDate); // Parse date from string
   //    let formattedDate = format(date, 'YYYY-MM-DD [|] HH:mm A');
   //    return formattedDate;
   // };

   return (
      <>
         {/* Header */}
         <h2>Trash</h2>
         <div className="pt-4">{/* <Auth /> */}</div>
         {/* Sample Note Adding */}
         {/* <div className="border-2 border-red-200 rounded-md my-6 p-3 space-y-2">
            <input
               className="bg-transparent border-b-2 focus:outline-none w-full"
               placeholder="Title..."
               value={noteTitle}
               onChange={(e) => setNoteTitle(e.target.value)}
               type="text"
            />
            <input
               className="bg-transparent border-b-2 focus:outline-none w-full"
               placeholder="Content..."
               value={noteContent}
               onChange={(e) => setNoteContent(e.target.value)}
               type="text"
            />
            <input
               className="bg-transparent border-b-2 focus:outline-none w-full"
               placeholder="Content..."
               checked={highlight}
               onChange={(e) => setNoteHighlight(e.target.checked)}
               type="checkbox"
            />
            <button
               className="bg-[#e69c5e] hover:bg-[#e69c5e]/90 mt-4 p-2 rounded-md w-full"
               onClick={addNote}
            >
               Submit
            </button>
         </div>
         <div className="mt-10">
            {notesList.map((notes) => (
               <div key={notes.id}>
                  <h2>{notes.id}</h2>
                  <h2 className="font-bold ">{notes.title}</h2>
                  <h4>{notes.noteContent}</h4>
                  <h4>{notes.noteLabel}</h4>
                  <h4>Date: {handleFormattedDate(notes.date)}</h4>
                  {notes.highlight ? <h4>Highlight</h4> : <h4>No Highlight</h4>}
                  <div className="flex gap-x-2">
                     <button
                        className="p-2 bg-[#e69c5e] rounded-md"
                        onClick={() => {
                           deleteNote(notes.id);
                        }}
                     >
                        Delete me
                     </button>
                     <input
                        className="bg-transparent border-b-2 focus:outline-none w-auto"
                        placeholder="New Title..."
                        type="text"
                        value={updatedNoteTitle}
                        onChange={(e) => setUpdatedNoteTitle(e.target.value)}
                     />
                     <button
                        className="p-2 bg-[#e69c5e] rounded-md"
                        onClick={() => {
                           updateNote(notes.id)
                        }}
                     >
                        Update Title
                     </button>
                  </div>
               </div>
            ))}
         </div> */}
      </>
   );
};

export default Trash;
