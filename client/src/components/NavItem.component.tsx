import React, { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  handleModal?: any;
  variant?:boolean
}

const NavItem: FC<Props> = ({ children, handleModal,variant }) => {
  return (
    <li
      onClick={handleModal}
      className={`cursor-pointer text-base font-railway  space-x-11 ${variant ? "text-black" : "text-white"}`}
    >
      {children}
    </li>
  );
};

export default NavItem;
