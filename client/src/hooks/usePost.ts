import { setHeader } from "@api/requestType";
import axiosInstance from "@hooks/axios";
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

   const request = async (payload: any, mediaInclude?: boolean) => {
      try {
         let response;

         setLoading(true);

         setError(undefined);

         if (mediaInclude) {
            let requestData: FormData = new FormData();

            const blobs = payload.images.map(
               async (blobUrl: any, index: any) => {
                  response = await axios.get(blobUrl, { responseType: "blob" });
                  requestData.append(
                     "images",
                     new File([response.data], "houseimage")
                  );
               }
            );

            await Promise.all(blobs);

            delete payload.images;

            const data = JSON.stringify(payload);

            requestData.append("data", data);

            const config = {
               headers: {
                  "content-type": "multipart/form-data",
                  authorization: `Bearer ${window.localStorage.getItem(
                     "access_token"
                  )}`,
               },
            };
            response = await axiosInstance.post(
               `/api/v1${url}`,
               requestData,
               config
            );
         } else {
            response = await axiosInstance.post(
               `/api/v1${url}`,
               {
                  ...payload,
               },
               {
                  headers: setHeader(),
               }
            );
         }

         const statusCode: number = response.status;

         const responseData: any = response.data;

         const data: any = {
            ...responseData,
            statusCode,
         };

         if (responseData?.access_token && responseData.id) {
            window.localStorage.setItem(
               "access_token",
               responseData?.access_token
            );
            window.localStorage.setItem("id", responseData.id);
         }
         setData(data);
         setLoading(false);
         setError(undefined);
      } catch (err: any) {
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
