import { Box, Container, Flex } from "@chakra-ui/react";
import ConversationPanel from "@components/ConversationPanel.component";
import EmptyConversation from "@components/EmptyConversation.component";
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
      <>
         <Box w='full'>
            <Container
               maxW='container.xl'
               rounded='md'
               mt={5}
               px={0}
               shadow="lg"
               bgColor='white'
               h='2xl'>
               <Flex w='full' h='full'>
                  <MessageListPanel
                     type='owner'
                     isLoading={isLoading}
                     messageList={message}
                     messageDetails={handleMessageDetails}
                  />
                  {messageDetails?.messageId ? (
                     <ConversationPanel
                        type='owner'
                        messageDetails={messageDetails!}
                     />
                  ) : (
                     <EmptyConversation type='owner' />
                  )}
               </Flex>
            </Container>
         </Box>
      </>
   );
}
