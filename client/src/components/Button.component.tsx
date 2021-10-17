import { Button } from "@chakra-ui/button";
import React, { FC } from "react";
import { ButtonProps } from "../Types/base";

const CircularButton: FC<ButtonProps> = ({
   children,
   handleModal,
   loading,
   type,
}) => {
   return (
      <Button
         size='md'
         h='2.5rem'
         w='120px'
         rounded='full'
         isLoading={loading}
         onClick={handleModal}
         {...type}
         className='bg-50 text-base font-bold text-400 font-railway'>
         {children}
      </Button>
   );
};

export default CircularButton;
