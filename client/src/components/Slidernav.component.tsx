import React, { ReactNode, FC } from "react";
interface Props {
  children: ReactNode;
}

const Slidenav: FC<Props> = ({ children }) => {
  return (
    <nav className="mt-20  w-full">
      <ul className=" font-railway text-base flex flex-col space-y-10 text-gray-400">
        {children}
      </ul>
    </nav>
  );
};


export default Slidenav