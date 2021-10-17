import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { HStack } from "@chakra-ui/layout";
import { InputGroup, InputRightElement } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useSubmit from "../hooks/useSubmit";
import { ISearch } from "../Types/base";

export default function Search() {
   const { register, handleSubmit } = useForm<ISearch>();
   const { onSubmit } = useSubmit();

   return (
      <HStack
         w={{
            sm: "xl",
            base: "full",
            lg: "full",
         }}
         pr={2}
         pl={2}
         h={16}
         bg='white'
         rounded='full'>
         <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
            <InputGroup w='full'>
               <Input
                  placeholder='Search for a City...'
                  border='none'
                  fontWeight='medium'
                  {...register("city")}
                  w='full'
                  _focus={{
                     border: "none",
                  }}
                  size='lg'
               />

               <InputRightElement w='150px' pt={2} mr={0}>
                  <Button
                     size='lg'
                     type='submit'
                     h='3rem'
                     w='full'
                     color='white'
                     rounded='full'
                     bg='purple.600'
                     _hover={{
                        backgroundColor: "purple.400",
                     }}>
                     Search
                  </Button>
               </InputRightElement>
            </InputGroup>
         </form>
      </HStack>
   );
}
