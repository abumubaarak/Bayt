import { Text } from "@chakra-ui/react";
import { useLandlord } from "@hooks/useApi";
import React, { FC } from "react";

interface Props {
   userId: string;
}
const Username: FC<Props> = ({ userId }) => {
    const { data: user } = useLandlord(userId!);
   const firstName = user?.data.firstname;
   return (
      <Text fontWeight='medium'>
         {firstName === undefined ? "unde " : firstName}
      </Text>
   );
};

export default Username;
