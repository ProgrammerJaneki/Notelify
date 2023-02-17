import React, { useCallback, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { NotesModel } from '../../../components/interface/NotesModel';

const IndividualNote = () => {
   const data = useLocation();
   const { title } = useParams();

   const shorterText = title?.slice(0, 5);

   useEffect(() => {
      console.log(
         'Content',
         data.state.title,
         data.state.content,
         data.state.highlight
      );
   }, []);

   return (
      <div className="space-y-3">
         <Link to="/">
            <Icon icon="ion:arrow-back-sharp" color="" width="24" height="24" />
         </Link>
         <div className="bg-[#16171d] p-4 rounded-lg w-full max-w-5xl">
            {/* Header */}
            <div className="flex justify-between">
               {/* Left */}
               <div className="inline-flex items-center gap-x-2">
                  <button type="button">
                     <div className="border border-[#DEDEDE] rounded-full w-5 h-5"></div>
                  </button>
                  <h4>{title}</h4>
                  <h2>{data.state.content}</h2>
                  {/* <h2>{data.state.title}</h2> */}
               </div>
               {/* Right */}
               <div className="inline-flex items-center gap-x-3">
                  {/* Edit */}
                  <button
                     className="hover:text-[#7B7A91] transition-all duration-150"
                     type="button"
                  >
                     <Icon
                        icon="mdi:edit-outline"
                        color=""
                        width="24"
                        height="24"
                     />
                  </button>
                  <button
                     className="hover:text-[#7B7A91] transition-all duration-150"
                     type="button"
                     onClick={() => {
                        data.state.deleteNote;
                     }}
                  >
                     <Icon
                        icon="material-symbols:delete-outline-rounded"
                        color=""
                        width="24"
                        height="24"
                     />
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

// Things to DO
// Set up the page for editing notes
// Fix page redirecting with unique link for each notes
// Connect react to firebase

export default IndividualNote;
