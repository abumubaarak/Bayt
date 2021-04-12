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
  description?: string;
  duration?:number|3000,
  status: "info" | "warning" | "success" | "error" | undefined;
}
const useToastMessage = () => {
  const toast = useToast();

  const message = (params: Toast) => {
    toast({ ...params, isClosable: true });
  };
  return {message};
};

export default useToastMessage;
