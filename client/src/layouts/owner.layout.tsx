import React,{ReactNode,FC} from "react";


interface Props{
  slidebar?:any,
  children?:ReactNode
}
const Layout:FC<Props>=({slidebar,children}) =>{
   

  return (
    <div className="flex h-screen">

      <div className=" flex-4 shadow-2xl flex pt-5 flex-col items-center ">
           
          {slidebar}
      </div>
      <div className=" flex-5 bg-50 pl-12 pt-6">
          {children}
      </div>
    </div>
  );
}
export default Layout;

