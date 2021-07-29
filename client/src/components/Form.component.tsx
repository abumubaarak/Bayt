import React, { ReactNode, FC } from "react";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";

interface Props {
  children: ReactNode;
  title: string;
  name?: string;
  type: string;
  register?: UseFormRegisterReturn | undefined;
}
const Form: FC<Props> = ({ children, title, type, name, register }) => {
  const [togglePassword, settogglePassword] = useState<boolean>(false)
  const toggleClass:string="w-5 h-5 self-center -ml-7 pr-1" 
  return (
    <div className="flex flex-col mb-6">
      <label
        htmlFor={title}
        className="font-semibold text-gray-600 pb-2 subpixel-antialiased"
      >
        {children}
      </label>{" "}
      <div className={`${ type == 'password' ? 'flex':""} `}>
        <input
          type={togglePassword ? "text" : type}
          name={name ? name : title}
          placeholder={title}
          {...register}
          className={` border-2  border-gray-400   py-2  px-5 font-sand 
          focus:outline-none focus:ring-4 focus:ring-opacity-50 focus:ring-purple-600
          focus:border-transparent  placeholder-gray-600 focus:placeholder-gray-400
          rounded-3xl ${type == 'password' ? ('flex-1'):"w-full" } `}
        />
        { type == "password"?
          togglePassword ?
            (<BsEye className={toggleClass}
            onClick={() => settogglePassword(!togglePassword)} />) :
            (<BsEyeSlash className={toggleClass}
              onClick={() => settogglePassword(!togglePassword)} />) :
          null}
       </div>
     
    </div>
  );
};

export default Form;
