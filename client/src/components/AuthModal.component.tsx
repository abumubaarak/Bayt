import {
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalHeader,
   ModalOverlay,
} from "@chakra-ui/modal";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { RiFacebookCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { AuthModelProps } from "../Types/base";

const { REACT_APP_BASE_URL: BASE_URL } = process.env;
const socialLogin = (social: string) => {
   window.open(`${BASE_URL}/auth/${social}`, "_self");
};
const changeAuth = (
   setChangeAuthType: Dispatch<SetStateAction<boolean | undefined>>,
   setType: (active?: boolean | undefined) => void,
   changeAuthType: boolean | undefined
) => {
   setChangeAuthType((preChangeAuthType) => !preChangeAuthType);
   setType(changeAuthType);
};

const AuthModel: FC<AuthModelProps> = ({
   isOpen,
   onClose,
   setType,
   typeAuth,
}) => {
   const [changeAuthType, setChangeAuthType] = useState<boolean>();

   return (
      <Modal
         isOpen={isOpen}
         onClose={onClose}
         isCentered
         motionPreset='slideInBottom'>
         <ModalOverlay />
         <ModalContent>
            <ModalHeader className='text-center font-sand font-black text-base'>
               {typeAuth ? "Register" : "Login"}
            </ModalHeader>
            <p className='  text-center font-semibold font-sand'>
               {typeAuth ? (
                  <>
                     Already have an account ?
                     <span
                        className='font-semibold font-sand text-500 cursor-pointer'
                        onClick={() =>
                           changeAuth(
                              setChangeAuthType,
                              setType,
                              changeAuthType
                           )
                        }>
                        Log in
                     </span>
                  </>
               ) : (
                  <>
                     Don’t have an account?
                     <span
                        className='font-semibold font-sand text-500 cursor-pointer'
                        onClick={() =>
                           changeAuth(
                              setChangeAuthType,
                              setType,
                              changeAuthType
                           )
                        }>
                        {" "}
                        Register
                     </span>
                  </>
               )}
            </p>
            <ModalCloseButton />
            <ModalBody className='text-center font-railway font-semibold text-xl '>
               <div
                  onClick={() => socialLogin("google")}
                  className='mt-3 hover:bg-50 cursor-pointer flex items-center  border-gray-500  border-2 px-7 py-2 rounded-full'>
                  <FcGoogle />
                  <p className=' flex-1 text-center'> Continue with Google </p>
               </div>

               <div className='mt-4 hover:bg-50 cursor-pointer text-white flex items-center bg-blue-500  border-2 px-7 py-2 rounded-full'>
                  <RiFacebookCircleFill />
                  <p className=' flex-1 text-center'>Continue with Facebook</p>
               </div>
               <div
                  onClick={() => socialLogin("github")}
                  className='my-5 hover:bg-50 cursor-pointer text-white flex items-center  bg-black  border-2 px-7 py-2 rounded-full'>
                  <AiFillGithub />
                  <p className=' flex-1 text-center'> Continue with Github </p>
               </div>
               <div className='flex justify-center font-sand mt-8 mb-4'>
                  <p className='font-bold text-base'>
                     Are you an Owner?{" "}
                     <span className='font-semibold font-sand text-500 cursor-pointer'>
                        {" "}
                        {typeAuth ? (
                           <>
                              <Link to='/owner/signup'>Create an Account</Link>
                           </>
                        ) : (
                           <>
                              <Link to='/owner/login'>Log in</Link>
                           </>
                        )}
                     </span>
                  </p>
               </div>
            </ModalBody>
         </ModalContent>
      </Modal>
   );
};
export default AuthModel;
