import { useState, useEffect, FormEvent, useRef, ChangeEvent } from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import MainHeader from './components/header/MainHeader';
import Home from './pages/home/Home';
import IndividualNote from './pages/home/NoteComponents/IndividualNote';
import { NotesModel } from './components/interface/NotesModel';
import Trash from './pages/Trash';
import { v4 as uuidv4 } from 'uuid';
// firebase imports
import Auth from './utilities/auth';
import 'firebase/firestore';
import { db } from './components/config/notelify-firebase';
import {
   collection,
   getDocs,
   addDoc,
   deleteDoc,
   updateDoc,
   doc,
} from 'firebase/firestore';

function App() {
   // Note States
   const [modalVisible, setModalVisible] = useState<boolean>(false);
   const [noteTitle, setNoteTitle] = useState<string>('');
   const [noteContent, setNoteContent] = useState<string>('');
   const [noteHighlight, setNoteHighlight] = useState<boolean>(false);
   const [searchInput, setSearchInput] = useState<string>('');
   const [searchQuery, setSearchQuery] = useState<string>('');
   // const searchQueryRef = useRef<HTMLInputElement>(null);

   // Should have put the notes here and used a context
   // const [notes, setNotes] = useState<NotesModel[]>(
   //    () => {
   //       const storedNotes = localStorage.getItem('notelify_notes');
   //       if (storedNotes) {
   //          return JSON.parse(storedNotes);
   //       }
   //       return [];
   //    }
   // );
   const notesRef = collection(db, 'notes');
   const [notes, setNotes] = useState<NotesModel[]>([]);

   // Loads the notes whenever changes happens
   // useEffect(() => {
   //    localStorage.setItem('notelify_notes', JSON.stringify(notes));
   // }, [notes]);

   useEffect(() => {
      const getNotes = async () => {
         try {
            const data = await getDocs(notesRef);
            const filteredData: NotesModel[] = data.docs.map((doc) => ({
               id: doc.id,
               ...doc.data(),
            })) as NotesModel[];
            setNotes(filteredData);
         } catch (err) {
            console.log(err);
         }
      };
      getNotes();
   }, [notesRef]);

   const addNotes = async () => {
      const newNote = {
         title: noteTitle,
         noteContent: noteContent,
         noteLabel: 'Design',
         date: new Date().toISOString(),
         complete: false,
         highlight: noteHighlight,
      };
      try {
         const docRef = await addDoc(notesRef, newNote);
         const newNoteWithId = {
            ...newNote,
            id: docRef.id,
         };
      } catch (err) {
         console.log(err);
      }
   };
   const saveEditNote = async (id: string, title: string, content: string) => {
      const noteDoc = doc(db, 'notes', id);
      try {
         await updateDoc(noteDoc, {
            title: title,
            noteContent: content,
         });
      } catch (err) {
         console.log(err);
      }
      // const editedNotes = notes.map((item: NotesModel) => {
      //    if (item.id === id) {
      //       item.title = title;
      //       item.noteContent = content;
      //    }
      //    return item;
      // });
      // setNotes(editedNotes);
   };

   const deleteNotes = async (id: string) => {
      const deleteNoteRef = doc(db, 'notes', id);
      try {
         await deleteDoc(deleteNoteRef);
         const newNotes = notes.filter((note) => note.id !== id);
         setNotes(newNotes);
      } catch (err) {
         console.log(err);
      }
      // const newNotes = notes.filter((note) => {
      //    return note.id !== id;
      // });
      // setNotes(newNotes);
   };

   // handler functions
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
   const handleSetSearchQuery = (event: ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
   };

   // Note Functions
   // const addNotes = (e: FormEvent) => {
   //    e.preventDefault();

   //    const newSetNote = [
   //       {
   //          id: uuidv4(),
   //          title: noteTitle,
   //          noteContent: noteContent,
   //          noteLabel: 'Design',
   //          date: new Date(),
   //          complete: false,
   //          highlight: noteHighlight,
   //       },
   //       ...notes,
   //    ];
   //    setNotes(newSetNote);
   //    setNoteTitle('');
   //    setNoteContent('');
   //    showModal(false);
   // };

   const filteredSearchQuery = notes.filter((note) => {
      return note.title
         .toString()
         .toLowerCase()
         .includes(searchQuery.toLowerCase());
   });
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

   const handleSearchBarProps = {
      handleSetSearchQuery,
      searchQuery,
   };

   const handleHomeProps = {
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
   };

   return (
      <div className="main min-h-screen h-auto mx-auto px-3.5 sm:px-6 max-w-5xl">
         <MainHeader {...handleSearchBarProps} />
         <div className="py-2.5">
            <Routes>
               <Route path="/" element={<Home {...handleHomeProps} />} />
               <Route path="/bin" element={<Trash />} />
               <Route path="/notes/:title" element={<IndividualNote />} />
               {/* }></Route> */}
            </Routes>
         </div>
      </div>
   );
}

export default App;
