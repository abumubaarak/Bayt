import { HStack, Text } from "@chakra-ui/react";
import React from "react";

export default function NoContent({ content }: { content: string }) {
   return (
      <HStack w='full' justifyContent='center' marginTop={20}>
         <Text fontWeight={"semibold"}>{content}</Text>
      </HStack>
   );
}
