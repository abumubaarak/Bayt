import { FC, ReactNode } from "react";

interface Props {
   children: ReactNode;
   setType?: (title: String, active: boolean) => void;
}
const HouseTypeGroup: FC<Props> = ({ children }) => {
   return <div className='flex space-x-3'>{children}</div>;
};

export default HouseTypeGroup;
