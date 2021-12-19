import { logout } from "@api/api";
import { Tooltip } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";
import { NavLink, useHistory } from "react-router-dom";

interface Props {
   children: ReactNode;
   path: string;
}

const SlidenavItem: FC<Props> = ({ children, path }) => {
    const handleLogout = (path: string) => {
      if (path !== "logout") return;
      logout();
      localStorage.clear();
      document.cookie = "";
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
