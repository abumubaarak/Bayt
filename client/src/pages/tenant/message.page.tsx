import { Box, Container, Flex } from "@chakra-ui/react";
import ConversationPanel from "@components/ConversationPanel.component";
import Header from "@components/Header.component";
import MessageListPanel from "@components/MessageListPanel.component";
import { useUserMessages } from "@hooks/useApi";
import React, { useState } from "react";

export default function Message() {
   // const socket = io("http://localhost:9000", { autoConnect: false });

   // useEffect(() => {
   //    socket.on("connect", () => {
   //       socket.emit("user", localStorage.getItem("id"));
   //    });
   // }, []);

   // setTimeout(() => {
   //    socket.emit(socket.id, "Hello hey there");
   // }, 4000);

   // socket.on(socket.id, (data) => {
   //    console.log(socket.id);
   // });
   const { data: message, error } = useUserMessages();

   const [id, setId] = useState<string>("");
   const [tenantID, setTenantID] = useState<string>("");
   const [ownerID, setOwnerID] = useState<string>("");
   const handleMessageDetails = (
      messageID: string,
      tenantID: string,
      ownerId: string
   ) => {
      setId(messageID);
      setTenantID(tenantID);
      setOwnerID(ownerId);
   };

   return (
      <>
         <Box bg='gray.50' w='full' h='100vh'>
            <Header variant='others' />
            <Container
               maxW='container.xl'
               rounded='md'
               mt={5}
               px={0}
               bgColor='white'
               shadow='lg'
               h='xl'>
               <Flex w='full' h='full'>
                  <MessageListPanel
                     type='tenant'
                     messageList={message}
                     getMessageDetails={handleMessageDetails}
                  />
                  <ConversationPanel
                     messageID={id!}
                     type='tenant'
                     tenant_id={tenantID!}
                     owner_id={ownerID}
                  />
               </Flex>
            </Container>
         </Box>
      </>
   );
}
