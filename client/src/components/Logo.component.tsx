import React, { FC } from "react";

interface Props {
  variant?: boolean | undefined;
}

const Logo: FC<Props> = ({ variant }) => {
  console.log(variant);

  return (
    <h1
      className={`text-3xl font-extrabold font-sand tracking-widest ${
        variant ? "text-700 " : "text-white"
      }`}
    >
      Bayt
    </h1>
  );
};

export default Logo;
