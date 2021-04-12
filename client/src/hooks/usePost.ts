import axios from "axios";
import { useState } from "react";

interface User {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  password: string;
}
interface Default {
  httpStatus?: number;
}
interface Data extends Default {
  status: string;
  message?:string
  token: string;
}
interface Error extends Default {
  status?: string;
  message: string;
}
const usePost = () => {
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<Error>();
  const [response, setData] = useState<Data>();

  const registerUser = async (user: User) => {
    try {
      setLoading(true);
      setError(undefined);

      const response = await axios.post(
        "http://localhost:7000/api/v1/auth/register",
        {
          ...user,
        }
      );
      const statusCode: number = response.status;

      const responseData: any = response.data;

      const data: any = {
        ...responseData,
        statusCode,
      };

      setData(data);
      setLoading(false);
      setError(undefined);
    } catch (err) {
      setLoading(false);

      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (err.response) {
        const { data, status } = err.response;

        setError({
          ...data,
          status,
        });
      } else if (err.request) {
        // The request was made but no response was received

        setError({ message: "Unable to connect to server"});
      } else {
        // Something happened in setting up the request that triggered an Error
        setError({ message: err.message });
      }
    }
  };

  return { registerUser, loading, error, response };
};

export default usePost;
