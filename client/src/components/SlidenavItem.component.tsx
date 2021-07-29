import React, {  ReactNode, FC } from "react";
import { Link, NavLink } from "react-router-dom";

interface Props {
  children: ReactNode;
  path: string;
}

const SlidenavItem: FC<Props> = ({ children, path }) => {
 

  return (
    <NavLink activeClassName="border-r-2  border-500 text-500 font-black  pointer-events-none"  to={`/owner/${path}`}>
    <li 
      className="cursor-pointer   h-9 flex items-center justify-center">
      {children}
    </li>
  </NavLink>
   
  );
};
export default SlidenavItem;
