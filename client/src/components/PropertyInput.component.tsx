import { Box, Textarea } from "@chakra-ui/react";
import React, { ReactNode, FC } from "react";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import FormTitle from "./FormTitle.component";

interface Props {
  title: string;
  type?: string;
  value?: string;
  isTextArea?: boolean;
  maxLength?: number;
  register?: UseFormRegisterReturn | undefined;
  children?: ReactNode;
}
const PropertyInput: FC<Props> = ({
  title,
  type,
  register,
  value,
  maxLength,
  children,
  isTextArea,
}) => {
  return (
    <Box>
      <FormTitle title={title} />
      {isTextArea ? (
        <Textarea
          placeholder="House description"
          size="xl"
          h="180px"
          {...register}
          className="border border-gray-800 font-semibold font-comfortaa placeholder-gray-300 w-full p-3 rounded-md focus:outline-none"
          resize="none"
        />
      ) : (
        <input
          type={type}
          placeholder={title}
          value={value}
          maxLength={maxLength}
          {...register}
          className="border border-gray-800 font-semibold font-comfortaa placeholder-gray-300 w-full p-3 rounded-md focus:outline-none"
        />
      )}

      {children}
    </Box>
  );
};

export default PropertyInput;
