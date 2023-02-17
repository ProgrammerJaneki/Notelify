import React from 'react';
import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';

const Bin = () => {
   return (
      <div className="hover:bg-[#1F2026]  rounded-full p-2">
         <NavLink to="/bin">
            <Icon
               icon="majesticons:delete-bin-line"
               color="#dedede"
               width="24"
               height="24"
            />
         </NavLink>
      </div>
   );
};

export default Bin;
