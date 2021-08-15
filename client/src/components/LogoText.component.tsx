import { Heading, HStack, Image, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import TextLogo from "../assets/Logo_text.svg";

const LogoText:FC = () => {
  return <Image src={TextLogo} w="120px" h="35px" />;
};

export default LogoText;
