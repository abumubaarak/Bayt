import { Button, HStack, Icon, Input } from "@chakra-ui/react";
import React, { FC, useEffect } from "react";
import { useForm, UseFormReset, UseFormWatch } from "react-hook-form";
import { FiSend } from "react-icons/fi";
import { Socket } from "socket.io-client";

interface Props {
   tenant_id: string;
   socket: Socket;
   owner_id: string;
   messageId: string;
}

interface IMessageInput {
   message: string;
}
const ChatBox: FC<Props> = ({ tenant_id, owner_id, messageId, socket }) => {
   const { register, handleSubmit, reset, watch, getValues } =
      useForm<IMessageInput>();

   const onSubmit = (data: IMessageInput) => {
      const { message }: IMessageInput = data;

      sendUserMessage(watch, reset);
   };

   const sendUserMessage = (
      watch: UseFormWatch<IMessageInput>,
      reset: UseFormReset<IMessageInput>
   ) => {
      socket.emit(
         "send_message",
         {
            tenant_id,
            owner_id,
            message: watch("message"),
            messageId,
            sender: localStorage.getItem("id"),
         },
         (status: any) => {
            if (status.sent) reset();
         }
      );
   };

   // useEffect(
   //    () => {
   //       if (watch("message").length >= 1) {
   //          socket.emit("typing", {
   //             tenant_id,
   //             owner_id,
   //             messageId,
   //             isTyping: true,

   //             sender: localStorage.getItem("id"),
   //          });
   //       } else {
   //       }
   //    },
   //    () => {
   //       socket.emit("typing", {
   //          tenant_id,
   //          owner_id,
   //          messageId,
   //          isTyping: false,
   //          sender: localStorage.getItem("id"),
   //       })
   //    },
   //    [watch("message")]
   // );

   return (
      <HStack w='full' cursor='pointer' alignItems='start' pl='40px'>
         <form className='w-full flex' onSubmit={handleSubmit(onSubmit)}>
            <Input
               lin
               flex='1'
               {...register("message")}
               variant='unstyled'
               autoComplete='off'
               placeholder='Write your message'
            />
            <Button onClick={() => sendUserMessage(watch, reset)}>
               <Icon w={5} h={5} m={3} alignSelf='center' as={FiSend} />
            </Button>
         </form>
      </HStack>
   );
};
export default ChatBox;
