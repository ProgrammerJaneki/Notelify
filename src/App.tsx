import {
   useState,
   useEffect,
   FormEvent,
   useRef,
   ChangeEvent,
   useCallback,
} from 'react';
import { Routes, Route } from 'react-router-dom';
import MainHeader from './components/header/MainHeader';
import Home from './pages/home/Home';
import { NotesModel } from './components/interface/NotesModel';
import Trash from './pages/Trash';
import { v4 as uuidv4 } from 'uuid';
// firebase imports
import 'firebase/firestore';
import { db } from './components/config/notelify-firebase';
import {
   collection,
   getDocs,
   addDoc,
   deleteDoc,
   updateDoc,
   doc,
   getDoc,
   writeBatch,
} from 'firebase/firestore';

function App() {
   const [modalVisible, setModalVisible] = useState<boolean>(false);
   const [noteTitle, setNoteTitle] = useState<string>('');
   const [noteContent, setNoteContent] = useState<string>('');
   const [noteHighlight, setNoteHighlight] = useState<boolean>(false);
   const [searchQuery, setSearchQuery] = useState<string>('');

   const notesRef = collection(db, 'notes');
   const [notes, setNotes] = useState<NotesModel[]>([]);
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
   useEffect(() => {
      getNotes();
   }, []);

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
         const batch = writeBatch(db);
         const docRef = await addDoc(notesRef, newNote);
         batch.set(docRef, newNote);
         await batch.commit();
         const newNoteWithId = {
            ...newNote,
            id: docRef.id,
         };
         setNotes([...notes, newNoteWithId]);
      } catch (err) {
         console.log(err);
      }
      setNoteTitle('');
      setNoteContent('');
      setNoteHighlight(false);
      showModal(false);
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
      getNotes();
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
   };

   // handler functions
   const showModal = useCallback((value: boolean) => {
      setModalVisible(value);
   }, []);
   const handleTitle = useCallback((title: string) => {
      setNoteTitle(title);
   }, []);
   const handleContent = useCallback((content: string) => {
      setNoteContent(content);
   }, []);
   const handleNoteHighlight = useCallback((highlight: boolean) => {
      setNoteHighlight(highlight);
   }, []);
   const handleSetSearchQuery = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
         setSearchQuery(event.target.value);
      },
      []
   );

   const filteredSearchQuery = notes.filter((note) => {
      return note.title
         .toString()
         .toLowerCase()
         .includes(searchQuery.toLowerCase());
   });
   const toggleHighlight = async (id: string) => {
      const noteDoc = doc(db, 'notes', id);
      const docSnapshot = await getDoc(noteDoc);
      const currentHighlightValue = docSnapshot.data()?.highlight;

      try {
         await updateDoc(noteDoc, { highlight: !currentHighlightValue });
      } catch (err) {
         console.log(err);
      }
      getNotes();
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
      <div className="main min-h-screen h-auto mx-auto py-2 px-3 sm:px-6 max-w-5xl">
         <MainHeader {...handleSearchBarProps} />
         <div className="">
            <Routes>
               <Route path="/" element={<Home {...handleHomeProps} />} />
            </Routes>
         </div>
      </div>
   );
}

export default App;
