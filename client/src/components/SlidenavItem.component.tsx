import { Tooltip } from "@chakra-ui/react";
import { useLogout } from "@hooks/useLogout";
import React, { FC, ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface Props {
   children: ReactNode;
   path: string;
}

const SlidenavItem: FC<Props> = ({ children, path }) => {
   const {logout}= useLogout()
   const handleLogout = (path: string) => {
       if(!path)return 
      if (path !== "logout") return;
      logout()
    };
   return (
      <Tooltip label={path} placement='right'>
         {}
         <NavLink
            onClick={() => handleLogout(path)}
            activeClassName='border-r-2 w-full  border-500 text-400 font-black  pointer-events-none'
            to={`/owner/${path !== "logout" ? path : "login"}`}>
            <li className='cursor-pointer h-9 flex items-center justify-center'>
               {children}
            </li>
         </NavLink>
      </Tooltip>
   );
};
export default SlidenavItem;
