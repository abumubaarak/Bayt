import React, { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  handleModal?: any;
}

const NavItem: FC<Props> = ({ children, handleModal }) => {
  return (
    <li
      onClick={handleModal}
      className=" cursor-pointer text-base font-sand font-bold space-x-11 text-white"
    >
      {children}
    </li>
  );
};

export default NavItem;
