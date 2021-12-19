import { Icon, Text, VStack } from "@chakra-ui/react";
import "@stripe/stripe-js";
import React from "react";
import { BiChat } from "react-icons/bi";

export default function EmptyConversation({ type }: { type?: string }) {
   return (
      <VStack
         rounded='sm'
         bg='gray.100'
         h='full'
         pb={16}
         spacing={6}
         justifyContent='center'
         w='full'>
         <VStack
            boxSize='52'
            justifyContent='center'
            bgColor='white'
            shadow='sm'
            rounded='full'>
            <Icon as={BiChat} w='16' h='16' />
         </VStack>

         <Text fontWeight='semibold' fontSize='2xl'>
            Start connecting with {type === "owner" ? "Tenant" : "Landlord"}.
         </Text>
      </VStack>
   );
}
