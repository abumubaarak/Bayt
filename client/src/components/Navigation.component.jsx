import React from "react";

export default function Navigation() {
  return (
    <ul className="flex flex-row cursor-pointer items-center text-base font-sand font-bold space-x-11 text-white">
      <li>How it works</li>
      <li>Login</li>
      <li className="bg-50  mx-4 px-7 py-2  text-400   font-railway  rounded-3xl">
        Register
      </li>
    </ul>
  );
}
