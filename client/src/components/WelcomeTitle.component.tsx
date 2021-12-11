import { Text, VStack } from "@chakra-ui/react";
import { useUser_ } from "@hooks/useApi";
import React from "react";

export default function WelcomeTitle() {
   const { data: user } = useUser_();

   return (
      <VStack justifyContent='start' w='full' alignItems='start' spacing='0'>
         <Text fontWeight='semibold' fontSize='md'>
            Hi {user?.data.firstname},
         </Text>
         <Text fontWeight='semibold' fontFamily='heading' fontSize='3xl'>
            Welcome Back
         </Text>
      </VStack>
   );
}
