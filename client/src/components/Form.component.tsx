import React, { ReactNode,FC } from 'react'

interface Props{
    children:ReactNode,
    title:string,
    name?:string,
    type:string
}
const Form:FC<Props>=({children,title,type,name})=> {
    return (
        <div className="flex flex-col mb-7">
        <label
          htmlFor={title}
          className="font-semibold text-gray-600 pb-2 subpixel-antialiased"
        >
          {children}
        </label>{" "}
        <input
          type={type}
          name={name ? name:title}
          placeholder={title}
          className="focus: border-2 border-gray-400 py-2  px-5 font-sand focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent  placeholder-gray-600 focus:placeholder-gray-400 rounded-3xl"
        />
      </div>
    )
    
}

export default Form
