import { useHistory } from "react-router";
import { ISearch } from "../Types/base";

const useSubmit = () => {
   const history = useHistory();

   const onSubmit = (data: ISearch) => {
      const { city }: ISearch = data;
      if (city.length >= 3) {
         history.push(`/s/${city}`);
      }
   };

   return { onSubmit };
};

export default useSubmit;
