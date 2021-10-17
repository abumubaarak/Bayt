import { Tooltip } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface Props {
   children: ReactNode;
   path: string;
}

const SlidenavItem: FC<Props> = ({ children, path }) => {
   return (
      <Tooltip label={path} placement='right'>
         <NavLink
            activeClassName='border-r-2 w-full  border-500 text-400 font-black  pointer-events-none'
            to={`/owner/${path}`}>
            <li className='cursor-pointer h-9 flex items-center justify-center'>
               {children}
            </li>
         </NavLink>
      </Tooltip>
   );
};
export default SlidenavItem;
