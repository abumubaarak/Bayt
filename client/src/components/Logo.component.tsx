import { Heading, HStack, Image, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import Black from "../assets/black_logo.svg";

interface Props {
  variant?: "light" | "dark";
}

const Logo: FC<Props> = ({ variant }) => {
  return <Image src={Black} w="120px" h="35px" />;
};

export default Logo;
