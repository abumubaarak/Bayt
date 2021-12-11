import { HStack, Icon, Skeleton, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";

export default function InsightCard({
   value,
   label,
   color,
   icon,
   isLoading,
}: {
   label: string;
   value: number | string;
   color: string;
   isLoading: boolean;
   icon: IconType;
}) {
   return (
      <HStack spacing='4' overflow='hidden' alignItems='center' h='100%' px='2'>
         <HStack
            justifyContent='center'
            alignItems='center'
            bg={`${color}.100`}
            rounded='2xl'
            w='16'
            h='80%'>
            <Icon as={icon} w={10} h={10} color={`${color}.400`} />
         </HStack>

         <VStack spacing={`${!isLoading ? "0" : "4"}`} alignItems='flex-start'>
            <Skeleton h={`${isLoading && "18px"}`} w='36' isLoaded={!isLoading}>
               <Text fontWeight='semibold' color='' fontSize='2xl'>
                  {value}
               </Text>
            </Skeleton>
            <Skeleton h={`${isLoading && "18px"}`} w='48' isLoaded={!isLoading}>
               <Text color='gray.500' fontWeight='medium'>
                  {label}
               </Text>
            </Skeleton>
         </VStack>
      </HStack>
   );
}
