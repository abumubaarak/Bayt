import React, { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  header?: any;
}
const Home: FC<Props> = ({ children, header }) => {
  return (
    <div className="bg-main w-screen h-screen bg-no-repeat bg-cover bg-center">
      {header}
      <main className="mt-32 flex justify-center flex-col items-center ">
        {children}
      </main>
    </div>
  );
};
export default Home;
