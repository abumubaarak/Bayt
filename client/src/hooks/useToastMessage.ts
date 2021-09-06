import { useToast } from "@chakra-ui/toast";

interface Toast {
  position?:
    | "bottom-left"
    | "bottom-right"
    | "bottom"
    | "top-left"
    | "top-right"
    | "top"
    | undefined;
  title?: string;
  description?: string | any;
  duration?: number | 2000;
  status: "info" | "warning" | "success" | "error" | undefined;
}
const useToastMessage = () => {
  const toast = useToast();

  const message = (params: Toast) => {
    toast({ ...params, isClosable: true, duration: 2000 });
  };

  const errorToast = (desc: string) => {
    message({
      status: "error",
      description: desc,
      position: "bottom-left",
    });
  };

  const successToast = (desc: string) => {
    message({
      status: "success",
      description: desc,
      position: "top-right",
    });
  };

  return { message,errorToast,successToast };
};

export default useToastMessage;
