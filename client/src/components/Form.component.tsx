import React, { ReactNode, FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  children: ReactNode;
  title: string;
  name?: string;
  type: string;
  register?: UseFormRegisterReturn | undefined;
}
const Form: FC<Props> = ({ children, title, type, name, register }) => {
  return (
    <div className="flex flex-col mb-6">
      <label
        htmlFor={title}
        className="font-semibold text-gray-600 pb-2 subpixel-antialiased"
      >
        {children}
      </label>{" "}
      <input
        type={type}
        name={name ? name : title}
        placeholder={title}
        {...register}
        className=" border-2 border-gray-400 py-2  px-5 font-sand focus:outline-none focus:ring-4 focus:ring-opacity-50 focus:ring-purple-600 focus:border-transparent  placeholder-gray-600 focus:placeholder-gray-400 rounded-3xl"
      />
    </div>
  );
};

export default Form;
