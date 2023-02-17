import React from 'react';

interface filterButtonModel {
   activeButton: number;
   filterButtonOrder: number;
   filterButtonName: string;
   filterButtonFunction: any;
}

const noteFilterButton = {
   noteFilterButtonStyle:
      'text-[#787A9 hover:text-[#fff] inline-block rounded-md py-1.5 w-[33%] transition-all duration-150 ease-linear',
};
const activeFilterButton = {
   activeFilterButtonStyle: 'font-bold bg-[#E69C5E] text-[#fff]',
};

const FilterButton = ({
   activeButton,
   filterButtonName,
   filterButtonOrder,
   filterButtonFunction,
}: filterButtonModel) => {
   return (
      <button
         className={`${noteFilterButton.noteFilterButtonStyle} ${
            activeButton === filterButtonOrder
               ? activeFilterButton.activeFilterButtonStyle
               : ''
         }`}
         onClick={() => {
            filterButtonFunction(filterButtonOrder);
         }}
         type="button"
      >
         {filterButtonName}
      </button>
   );
};

export default FilterButton;
