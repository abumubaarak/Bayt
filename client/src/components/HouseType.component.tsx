import { useState } from "react";
import { FC } from "react";

interface Props {
  title: string;
  active: boolean;
  setType?: (title: string, active: boolean) => void;
}
const HouseType: FC<Props> = ({ title, setType, active }) => {
  const [titleType, setTitleType] = useState<boolean>(false);

  const handleType = () => {      setType!(title, true);

      
    setTitleType(!titleType);
  };
  return (
    <p
      className={`p-4 font-medium font-comfortaa rounded-md shadow-lg cursor-pointer ${
        active ? "bg-300 text-white" : "bg-white"
      }`}
      onClick={handleType}
    >
      {title}
    </p>
  );
};

export default HouseType;
