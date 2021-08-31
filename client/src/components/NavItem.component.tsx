import React, { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  handleModal?: any;
  variant?: "light" | "dark";
}

const NavItem: FC<Props> = ({ children, handleModal,variant }) => {
  return (
    <li
      onClick={handleModal}
      className={`cursor-pointer text-base font-railway  space-x-11 ${variant==="light" ? "text-white" : "text-dark"}`}
    >
      {children}
    </li>
  );
};

export default NavItem;
