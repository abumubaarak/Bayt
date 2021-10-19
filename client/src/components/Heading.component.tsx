import { Text } from "@chakra-ui/react";
import React, { FC } from "react";

type Props = {
   title: string;
};

const Heading: FC<Props> = ({ title }) => {
   return (
      <Text fontSize='2xl' color='brand.500' fontWeight='semibold'>
         {title}
      </Text>
   );
};

export default Heading;
