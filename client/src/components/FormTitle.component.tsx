import { FC } from "react";

interface Props {
   title: string;
}

const FormTitle: FC<Props> = ({ title }) => {
   return (
      <h3 className='font-bold tracking-wide text-xl mb-4 font-railway text-gray-800'>
         {title}
      </h3>
   );
};

export default FormTitle;
