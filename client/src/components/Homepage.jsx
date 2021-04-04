import React from "react";
import Form from "./Form.component";
import Logo from "./Logo.component";
import Navigation from "./Navigation.component";

export default function Homepage() {
  return (
    <div class="bg-main w-screen h-screen bg-no-repeat bg-cover  bg-center">
      <div className="flex justify-between  px-20 pt-7">
        <Logo />
        <Navigation />
      </div>
      <main className="mt-32 flex justify-center flex-col items-center ">
        <h1 className="text-7xl text-white font-black  leading-tight font-railway">
          Discover a place
          <br />
          you&prime;ll love to live
        </h1>
        <Form />
      </main>
    </div>
  );
}
