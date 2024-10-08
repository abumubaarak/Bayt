import {
   Alert,
   AlertIcon,
   Box,
   Flex,
   SimpleGrid,
   Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { FC, useCallback, useEffect, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { AiOutlineCamera } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import PropertyInput from "../components/PropertyInput.component";
import { LayoutProps } from "../pages/Owner/addProperty.page";
import { IOthers, setOthers } from "../redux/formSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import SlideUp from "../transition/SlideUp.transition";

interface IEx extends FileWithPath {
   preview: string;
}
const Others: FC<LayoutProps> = ({ setFormState }) => {
   const { register, watch, handleSubmit, getValues } = useForm<IOthers>();
   const state = useAppSelector((state) => state.form.others);
   const dispatch = useAppDispatch();

   const [imageUrls, setImageUrls] = useState<string[]>([]);
   const [files, setFiles] = useState<IEx[]>([]);

   const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
      setImageUrls([]);

      setFiles(
         acceptedFiles.map((file) =>
            Object.assign(file, {
               preview: URL.createObjectURL(file),
            })
         )
      );
   }, []);
   const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
      accept: "image/jpg, image/jpeg, image/png",
      onDrop,
      maxFiles: 3,
   });

   const removeImage = (preview: string) => {
      setImageUrls(imageUrls?.filter((value) => value !== preview));
   };

   const thumbs = imageUrls?.map((value, index) => (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={index}>
         <div className='relative'>
            <MdCancel
               className='h-7 w-7 bg-blue-400 text-white rounded-full absolute right-2 top-2'
               onClick={() => removeImage(value)}
            />

            <img className='rounded-md h-52 object-cover' src={value} />
         </div>
      </motion.div>
   ));

   useEffect(() => {
      files.forEach((file) => {
         setImageUrls((prevState) => [...prevState!, file.preview]);
      });
      return () => {
         files.forEach((file) => {
            URL.revokeObjectURL(file.preview);
         });
      };
   }, [files]);

   useEffect(() => {
      const { description, cost } = getValues();

      dispatch(
         setOthers({
            others: {
               cost,
               description: description,
               images: imageUrls,
            },
         })
      );

      if (description && cost && imageUrls.length > 0) {
         setFormState(false);
      } else {
         setFormState(true);
      }
   }, [watch("description"), watch("cost"), imageUrls]);

   return (
      <SlideUp setMarginBottom={true}>
         <Box
            {...getRootProps()}
            h='56'
            p='2'
            rounded='xl'
            className='shadow-2xl'
            my='10'>
            {files.length <= 0 ? (
               <>
                  <Flex flexDir='column' alignItems='center'>
                     <AiOutlineCamera className=' w-10 h-10 mt-4' />
                     <Text fontSize='xl' mt='2' className='font-railway'>
                        Upload all your photos in one go!
                     </Text>
                  </Flex>
                  <Alert
                     status='warning'
                     position='relative'
                     top='16'
                     rounded='md'>
                     <AlertIcon />
                     Maximum of 3 Pictures.
                  </Alert>
               </>
            ) : (
               <>
                  <SimpleGrid columns={3} spacing={3}>
                     {thumbs}
                  </SimpleGrid>
               </>
            )}

            <input {...getInputProps()} />
         </Box>

         <form className='space-y-11'>
            <PropertyInput
               title="What's the yearly rent?"
               type='number'
               maxLength={4}
               register={register("cost", { required: true })}
            />

            <PropertyInput
               title='Add a description'
               isTextArea={true}
               register={register("description", { required: true })}
            />
         </form>
      </SlideUp>
   );
};

export default Others;
