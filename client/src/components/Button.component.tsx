import React, { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  handleModal?: any;
}
const Button: FC<Props> = ({ children, handleModal }) => {
  return (
    <button
      onClick={handleModal}
      className="bg-50  px-7 py-2 text-base font-bold text-400 font-railway rounded-3xl"
    >
      {children}
    </button>
  );
};

export default Button;
