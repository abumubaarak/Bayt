import { Button } from "@chakra-ui/button";
import React, { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  handleModal?: any;
  loading?:boolean
}
const CircularButton: FC<Props> = ({ children, handleModal,loading }) => {
  return (
    <Button
     as="button"
      size="md"
      borderRadius="25"
      isLoading={loading}
      onClick={handleModal}
      className="bg-50  px-7 py-3 text-base font-bold text-400 font-railway rounded-3xl"
    >
      {children}
    </Button>
  );
};

export default CircularButton;
