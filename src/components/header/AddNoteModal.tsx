import React, { FC, FormEvent, useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

interface HomeModel {
   addNotes: (e: FormEvent) => any | void;
   handleTitle: (title: string) => any | void;
   handleContent: (content: string) => any | void;
   handleNoteHighlight: (highlight: boolean) => void;
   noteTitle: string;
   noteContent: string;
   noteHighlight: boolean;
   showModal: any;
}

const secondaryButton = {
   defaultStyle:
      'inline-flex items-center gap-x-1 text-[#DEDEDE] text-sm border py-1 px-2 rounded-md ',
   highlightedButtonStyle: ' border-[#E69C5E] text-[#E69C5E]',
};

const AddNoteModal: FC<HomeModel> = ({
   addNotes,
   handleTitle,
   handleContent,
   handleNoteHighlight,
   showModal,
   noteTitle,
   noteContent,
   noteHighlight,
}) => {
   // const [modalVisible, setModalVisible] = useState<boolean>(false);
   const [highlight, setHighlight] = useState<boolean>(false);
   // const [value, setValue] = useState<string>('');
   const handleAddNote = (e: FormEvent) => {
      e.preventDefault();
      if (noteTitle === '' && noteContent === '') return;
      addNotes(e);
   };

   useEffect(() => {
      console.log(noteTitle);
   });

   return (
      <div className="relative">
         {/* Modal */}
         <div className="bg-smoke-lighter inset-0 fixed top-0 left-0 right-0 z-50 px-3.5 sm:px-6 flex items-center justify-center w-full">
            {/* Content */}
            <form
               className="bg-[#1F2026] flex flex-col gap-y-4 p-4 max-w-2xl w-full h-[25rem] rounded-md"
               onSubmit={handleAddNote}
            >
               {/* Title */}
               <div className="py-2 ">
                  <input
                     className="bg-transparent focus:outline-none w-full"
                     type="text"
                     placeholder="Title"
                     value={noteTitle}
                     onChange={(e) => {
                        handleTitle(e.target.value);
                     }}
                  />
               </div>
               {/* Content */}
               <div className="">
                  <textarea
                     className="bg-transparent w-full resize-none focus:outline-none overflow-y-auto"
                     name=""
                     id=""
                     rows={6}
                     placeholder="Start typing"
                     value={noteContent}
                     onChange={(e) => {
                        handleContent(e.target.value);
                     }}
                  ></textarea>
               </div>
               {/* Label */}
               <div className=" inline-block space-x-2">
                  <button
                     className={`${secondaryButton.defaultStyle}
                        ${'border-[#787A91]'}`}
                     type="button"
                  >
                     <Icon
                        icon="pajamas:label"
                        color=""
                        width="18"
                        height="18"
                     />
                     <span>Design</span>
                  </button>
                  <button
                     className={`
                        ${secondaryButton.defaultStyle}
                           ${
                              noteHighlight
                                 ? secondaryButton.highlightedButtonStyle
                                 : 'border-[#787A91]'
                           }   
                        `}
                     onClick={() => {
                        handleNoteHighlight(!noteHighlight);
                     }}
                     type="button"
                  >
                     {!noteHighlight && (
                        <Icon
                           icon="material-symbols:bookmark-outline"
                           color=""
                           width="18"
                           height="18"
                        />
                     )}
                     {noteHighlight && (
                        <Icon
                           icon="material-symbols:bookmark-rounded"
                           color=""
                           width="18"
                           height="18"
                        />
                     )}
                     <span>Highlight</span>
                  </button>
               </div>
               {/* Buttons */}
               <div className="space-y-2 mt-auto">
                  <input
                     className="bg-[#ac7546] text-white p-2 rounded-md mx-auto  w-full cursor-pointer"
                     type="submit"
                     value="Add Note"
                     // onClick={() => setModalVisible(false)}
                  />
                  <button
                     className=" p-2 rounded-md mx-auto  w-full"
                     onClick={() => {
                        showModal(false);
                     }}
                     type="button"
                  >
                     Cancel
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default AddNoteModal;
