import { Heading, HStack, Image, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import BlackLogo from "../assets/black_logo.svg";
import WhiteLogo from "../assets/Logo_text.svg";

interface Props {
  variant?: "light" | "dark";
}

const Logo: FC<Props> = ({ variant }) => {
  const type = variant === "dark" ? BlackLogo : WhiteLogo;
  const history = useHistory();

  const navigateHome = () => {
    history.push("/");
  };
  return (
    <>
      <Image
        onClick={navigateHome}
        cursor="pointer"
        src={type}
        w="120px"
        h="35px"
      />
    </>
  );
};

export default Logo;
