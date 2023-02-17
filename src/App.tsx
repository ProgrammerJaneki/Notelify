import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import MainHeader from './components/header/MainHeader';
import Home from './pages/home/Home';
import IndividualNote from './pages/home/NoteComponents/IndividualNote';
import Trash from './pages/Trash';

function App() {
   return (
      <div className="main min-h-screen h-auto mx-auto px-3.5 sm:px-6 max-w-5xl">
         <MainHeader />
         <div className="py-2.5">
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/bin" element={<Trash />} />
               <Route path="/notes/:title" element={<IndividualNote />} />
               {/* }></Route> */}
            </Routes>
         </div>
      </div>
   );
}

export default App;
