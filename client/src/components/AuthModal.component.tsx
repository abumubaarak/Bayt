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
import { Link } from "react-router-dom";

export interface Props {
  isOpen: boolean;
  typeAuth: boolean;
  setType: (active?: boolean) => void;
  onClose(): any;
}


export default function AuthModel(props: Props) {
  const BASE_URL="http://localhost:3000/api/v1/auth/"
  const [changeAuthType, setChangeAuthType] = useState<boolean>();

  const changeAuth = () => {
    setChangeAuthType((preChangeAuthType) => !preChangeAuthType);
    props.setType(changeAuthType);
  };
  const googleLogin = () => {
    window.open(`${BASE_URL}google`, "_self");
  };

  const githubLogin = () => {
    window.open(`${BASE_URL}github`, "_self");
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
        <ModalHeader className="text-center font-sand font-black text-base">
          {props.typeAuth ? "Register" : "Login"}
        </ModalHeader>
        <p className="  text-center font-semibold font-sand">
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
          <div
            onClick={googleLogin}
            className="mt-3 hover:bg-50 cursor-pointer flex items-center  border-gray-500  border-2 px-7 py-2 rounded-full"
          >
            <FcGoogle />
            <p className=" flex-1 text-center"> Continue with Google </p>
          </div>

          <div className="mt-4 hover:bg-50 cursor-pointer text-white flex items-center bg-blue-500  border-2 px-7 py-2 rounded-full">
            <RiFacebookCircleFill />
            <p className=" flex-1 text-center"> Continue with Facebook </p>
          </div>
          <div
            onClick={githubLogin}
            className="my-5 hover:bg-50 cursor-pointer text-white flex items-center  bg-black  border-2 px-7 py-2 rounded-full"
          >
            <AiFillGithub />
            <p className=" flex-1 text-center"> Continue with Github </p>
          </div>
          <div className="flex justify-center font-sand mt-8 mb-4">
            <p className="font-bold text-base">
              Are you an Owner?{" "}
              <span className="font-semibold font-sand text-500 cursor-pointer">
                {" "}
                {props.typeAuth ? (
                  <>
                    <Link to="/owner/signup">Create an Account</Link>
                  </>
                ) : (
                  <>
                    <Link to="/owner/login">Log in</Link>
                  </>
                )}
              </span>
            </p>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
