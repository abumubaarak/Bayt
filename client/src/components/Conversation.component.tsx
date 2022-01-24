import { TenantMessage } from "@api/apiType";
import { Flex } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

interface Props {
   conversation: TenantMessage[];
   owner_id: string;
   socket: Socket;
}
const Conversation: FC<Props> = ({ conversation, owner_id, socket }) => {
   const [chat, setChat] = useState<TenantMessage[]>();

   const id = window.localStorage.getItem("id");

   useEffect(() => {
      setChat(conversation);
   }, [conversation]);
   useEffect(() => {
      socket.on("receive_chat", (data) => {
         setChat((prevState) => [...prevState!, data]);
      });
   }, []);

   return (
      <>
         {chat?.map(({ _id, message, sender }) => (
            <Flex
               pl='40px'
               w='full'
               key={_id}
               justifyContent={`${id === sender ? "end" : "start"}`}>
               <Text
                  bg={`${id === sender ? "brand.500" : "white"}`}
                  fontWeight='medium'
                  rounded='md'
                  p={2}
                  
                  color={`${id === sender ? "white" : "black"}`}
                  flexBasis='50%'>
                  {message}
               </Text>
            </Flex>
         ))}
      </>
   );
};

export default Conversation;
