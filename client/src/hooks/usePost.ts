import axios from "axios";
import { useState } from "react";

interface Default {
  httpStatus?: number;
  status?: string;
}
type Data = Default & {
  message?: string;
  token: string;
};

type Error = Default & {
  message: string;
};
const usePost = (url: string) => {
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<Error>();
  const [response, setData] = useState<Data | any>();

  const request = async (payload: any) => {
    try {
      setLoading(true);

      setError(undefined);

      const response = await axios.post(url, {
        ...payload,
      });

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

        setError({ message: "Unable to connect to server" });
      } else {
        // Something happened in setting up the request that triggered an Error
        setError({ message: err.message });
      }
    }
  };

  return { request, loading, error, response };
};

export default usePost;
