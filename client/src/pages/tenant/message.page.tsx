import { Box, Container, Flex } from "@chakra-ui/react";
import ConversationPanel from "@components/ConversationPanel.component";
import EmptyConversation from "@components/EmptyConversation.component";
import Header from "@components/Header.component";
import MessageListPanel from "@components/MessageListPanel.component";
import { useMessages } from "@hooks/useApi";
import { MessageDetails } from "@type/base";
import React, { useState } from "react";

export default function Message() {
   const { data: message, error, isLoading } = useMessages();

   const [messageDetails, setMessageDetails] = useState<MessageDetails>();
   const handleMessageDetails = (messageDetails: MessageDetails) => {
      setMessageDetails({ ...messageDetails });
   };

   return (
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
                  isLoading={isLoading}
                  messageList={message}
                  messageDetails={handleMessageDetails}
               />

               {messageDetails?.messageId ? (
                  <ConversationPanel
                     type='tenant'
                     messageDetails={messageDetails!}
                  />
               ) : (
                  <EmptyConversation />
               )}
            </Flex>
         </Container>
      </Box>
   );
}
