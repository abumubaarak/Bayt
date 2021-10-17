import { VStack, Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { useState } from "react";
import { FC } from "react";
import { IoLogoPaypal } from "react-icons/io5";

interface Props {
   children: ReactNode;
   tag?: any;
   title?: any;
   setTag: (tag: string, state: boolean) => void;
}

const Features: FC<Props> = ({ children, title, tag, setTag }) => {
   const [active, setActive] = useState<boolean>(false);

   const handleClick = () => {
      if (!active) {
         setTag(tag, true);
      } else {
         setTag(tag, false);
      }
      setActive(!active);
   };

   return (
      <VStack
         color={active ? "brand.400" : "gray.300"}
         cursor='pointer'
         spacing='3'
         _hover={active ? { color: "brand.400" } : { color: "black" }}
         onClick={handleClick}
      >
         <Box border='1px' rounded='full' p='3'>
            {children}
         </Box>
         <p className={`text-bold ${active ? "font-bold" : ""}`}>{title}</p>
      </VStack>
   );
};

export default Features;
