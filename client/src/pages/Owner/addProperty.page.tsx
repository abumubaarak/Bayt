import { Button, Flex, Progress } from "@chakra-ui/react";
import { VscChromeClose } from "react-icons/vsc";
import Location from "@layouts/location.layout";
import PropertyDetails from "@layouts/property.layout";
import { useState, useEffect } from "react";
import Others from "@layouts/others.layout";
import { useAppSelector } from "@redux/hook";
import usePost from "@hooks/usePost";
import useToastMessage from "@hooks/useToastMessage";
import { useHistory } from "react-router-dom";

export interface LayoutProps {
   setFormState: (a: any) => void;
}

export default function Property() {
   const [type, setType] = useState<string>("Location");
   const [formData, setFormData] = useState<boolean>(true);
   const [count, setCount] = useState<number>(1);
   const history = useHistory();
   const { message } = useToastMessage();
   const location = useAppSelector((state) => state.form.location);
   const property = useAppSelector((state) => state.form.property);
   const others = useAppSelector((state) => state.form.others);
   const { loading, error, response, request } = usePost("/properties/");

  

   useEffect(() => {
      if (error) {
         message({
            position: "top",
            title: "Error",
            description: error?.message,
            status: "error",
         });
      }
   }, [error]);

   useEffect(() => {
      if (response) {
         message({
            position: "top",
            title: "Successful",
            duration: 5000,
            description: response?.message,
            status: "success",
         });

         setTimeout(() => {
            history.push("/owner/dashboard");
         }, 1000);
      }
   }, [response]);

   const handleContinue = () => {
      if (type === "Location") {
         setType("Property");
         setCount(2);
      } else if (type === "Property") {
         setType("Others");
         setCount(3);
      } else if (type === "Others") {
         request(
            {
               ...location,
               ...property,
               ...others,
            },
            true
         );
      }
   };

   const handleBack = () => {
      if (count === 2) {
         setType("Location");
         setCount(1);
      } else if (count === 3) {
         setType("Property");
         setCount(2);
      }
   };

   const handleFormData = (data: any) => setFormData(data);

   const renderFormType = () => {
      if (type === "Location") {
         return <Location setFormState={handleFormData} />;
      } else if (type === "Property") {
         return <PropertyDetails setFormState={handleFormData} />;
      } else if (type === "Others") {
         return <Others setFormState={handleFormData} />;
      }
   };
   return (
      <>
         <div className='h-16 shadow-sm flex justify-between   items-center px-6 w-full '>
            <div className='flex items-center '>
               <h1 className='text-3xl font-extrabold text-700 font-sand tracking-widest '>
                  Bayt
               </h1>
               <p className='text-lg pl-5 font-comfortaa font-semibold text-gray-800'>
                  Step {count}: {type}
               </p>
            </div>

            <div className='bg-gray-200 rounded-md cursor-pointer  flex items-center justify-center w-9 h-9'>
               <VscChromeClose className='w-5 h-5' />
            </div>
         </div>
         <Progress
            value={count * 30}
            colorScheme='brand'
            height='5px'
            className=''
            rounded='sm'
            isAnimated
         />

         <div className='mt-10 ml-auto  mr-auto max-w-md'>
            {renderFormType()}
         </div>
         <Flex
            alignItems='center'
            pos='fixed'
            h='100px'
            className='space-x-3'
            bg='white'
            bottom='0'
            width='100%'
            justifyContent='center'
         >
            <Button
               display={type === "Location" ? "none" : "250px"}
               size='lg'
               w={250}
               disabled={loading}
               onClick={handleBack}
            >
               Back
            </Button>
            <Button
               size='lg'
               bg='brand.500'
               disabled={formData}
               isLoading={loading}
               color='white'
               _hover={{ bg: "brand.300" }}
               w={type === "Location" ? "460px" : "250px"}
               onClick={handleContinue}
            >
               {type === "Others" ? "Save & Post" : "Continue"}
            </Button>
         </Flex>
      </>
   );
}
