import { Text } from "@chakra-ui/react";
import { useListingDetails } from "@hooks/useApi";
import React, { FC } from "react";

interface Props {
   propertyId: string;
}
const PropertyName: FC<Props> = ({ propertyId }) => {
   const {
      data: propertyDetail,
      isLoading,
      isError,
   } = useListingDetails(propertyId);
   const name = propertyDetail?.data.name;
   return (
      <Text color='gray.800' fontWeight='black' fontSize='md' noOfLines={1}>
         {name === undefined ? " " : name}
      </Text>
   );
};

export default PropertyName;
