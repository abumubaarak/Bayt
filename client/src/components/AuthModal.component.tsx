import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/modal";
import { FcGoogle } from "react-icons/fc";
import { RiFacebookCircleFill } from "react-icons/ri";
import { AiFillGithub } from "react-icons/ai";
import { useState } from "react";

export interface Props {
  isOpen: boolean;
  typeAuth: boolean;
  setType: (active?: boolean) => void;
  onClose(): any;
}

export default function AuthModel(props: Props) {
  const [changeAuthType, setChangeAuthType] = useState<boolean>();

  const changeAuth = () => {
    setChangeAuthType((preChangeAuthType) => !preChangeAuthType);
    props.setType(changeAuthType);
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="text-center font-railway font-black text-base">
          {props.typeAuth ? "Register" : "Login"}
        </ModalHeader>
        <p className="text-center font-semibold font-sand">
          {props.typeAuth ? (
            <>
              Already have an account ?{" "}
              <span
                className="font-semibold font-sand text-500 cursor-pointer"
                onClick={changeAuth}
              >
                Log in
              </span>
            </>
          ) : (
            <>
              Don’t have an account ?
              <span
                className="font-semibold font-sand text-500 cursor-pointer"
                onClick={changeAuth}
              >
                {" "}
                Register
              </span>
            </>
          )}
        </p>
        <ModalCloseButton />
        <ModalBody className="text-center font-railway font-semibold text-xl ">
          <div className="mt-3 hover:bg-50 cursor-pointer flex items-center  border-gray-500  border-2 px-7 py-2 rounded-full">
            <FcGoogle />
            <p className=" flex-1 text-center"> Continue with Google </p>
          </div>

          <div className="mt-4 hover:bg-50 cursor-pointer text-white flex items-center bg-blue-500  border-2 px-7 py-2 rounded-full">
            <RiFacebookCircleFill />
            <p className=" flex-1 text-center"> Continue with Facebook </p>
          </div>
          <div className="my-5 hover:bg-50 cursor-pointer text-white flex items-center  bg-black  border-2 px-7 py-2 rounded-full">
            <AiFillGithub />
            <p className=" flex-1 text-center"> Continue with Github </p>
          </div>
          <div className="flex justify-center font-sand mt-8 mb-4">
            <p className="font-bold text-base">
              Are you an Owner ?{" "}
              <span className="font-semibold font-sand text-500 cursor-pointer">
                {" "}
                {props.typeAuth ? "Create an Account" : "Log in"}{" "}
              </span>
            </p>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
