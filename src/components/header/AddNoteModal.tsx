import React, { FC, FormEvent, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
   const [noticeModal, setNoticeModal] = useState<boolean>(false);
   // const [value, setValue] = useState<string>('');
   const handleAddNote = (e: FormEvent) => {
      // Title must not be empty
      e.preventDefault();
      if (noteTitle === '') {
         console.log('EMPTY');
         return;
      }
      addNotes(e);
   };

   // useEffect(() => {
   //    console.log('Title: ', noteTitle);
   // }, []);

   const handleCancel = () => {
      // Modal will pop up if content is not empty
      if (noteTitle !== '' || noteContent !== '') {
         setNoticeModal(true);
         return;
      }
      handleTitle('');
      handleContent('');
      handleNoteHighlight(false);
      setNoticeModal(false);
      showModal(false);
      // create a pop up if i want to save changes
      // create another function to check if there's content/title and put invalid instead of save
   };

   return (
      <>
         <div className="relative">
            {/* Modal */}
            <div className="bg-smoke-lighter inset-0 fixed top-0 left-0 right-0 z-50 px-3.5 sm:px-6 flex items-center justify-center w-full">
               {/* Add Note Modal */}
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
                           // showModal(false);
                           handleCancel();
                        }}
                        type="button"
                     >
                        Cancel
                     </button>

                     {noticeModal && (
                        <div className="bg-smoke-light inset-0 fixed top-0 left-0 right-0 z-50 px-3.5 sm:px-6 flex items-center justify-center w-full">
                           <div className="bg-[#1F2026] flex flex-col  rounded-lg px-4 py-5 w-[19rem] h-[19rem]">
                              <div className="flex flex-col items-center space-y-2">
                                 <Icon
                                    icon="material-symbols:sync-saved-locally-outline-rounded"
                                    width="72"
                                    height="72"
                                 />
                                 {/* Save Changes? */}
                                 <h2 className="font-bold text-2xl">
                                    Save Note?
                                 </h2>
                              </div>
                              {/* Bottom */}
                              <div className="w-full space-y-1.5 mt-auto">
                                 <input
                                    className="font-bold bg-[#AC7546] text-white rounded-md p-2 w-full"
                                    type="submit"
                                    value="Save"
                                    // onClick={() => {
                                    //    handleAddNote;
                                    //    setNoticeModal(true);
                                    // }}
                                 />
                                 {/* Save
                                 </input> */}
                                 {/* Cancel | without color */}
                                 <button
                                    className="font-bold  text-[#DEDEDE] rounded-md p-2 w-full"
                                    onClick={() => {
                                       handleCancel();
                                    }}
                                 >
                                    Cancel
                                 </button>
                              </div>
                           </div>
                        </div>
                     )}
                  </div>
               </form>
               {/* Second Modal */}
            </div>
         </div>
      </>
   );
};

export default AddNoteModal;
