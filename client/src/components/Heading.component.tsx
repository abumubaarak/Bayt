import { Text,Heading } from "@chakra-ui/react";
import React, { FC } from "react";

type Props = {
   title: string;
};

const Title: FC<Props> = ({ title }) => {
   return (
      <Heading size='lg' color='brand.500' fontWeight='semibold'>
         {title}
      </Heading>
   );
};

export default Title;
