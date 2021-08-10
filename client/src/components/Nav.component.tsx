import React, { ReactNode, FC } from "react";
interface Props {
  children: ReactNode;
}

const Nav: FC<Props> = ({ children }) => {
  return (
    <>
      <ul className="flex flex-row items-center space-x-8">{children}</ul>
    </>
  );
};

export default Nav;
