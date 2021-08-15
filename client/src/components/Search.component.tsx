import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

interface ISearch {
  city: string;
}
export default function Search() {
  const { register, handleSubmit } = useForm<ISearch>();
  const history = useHistory();

  const onSubmit = (data: ISearch) => {
    const { city }: ISearch = data;

    if (city.length >= 3) {
      history.push(`/s/${city}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-50 flex shadow-2xl justify-center mt-11 font-sand"
    >
      <input
        type="search"
        className="bg-white -mr-12 rounded-full flex-base px-10 py-4"
        {...register("city")}
        placeholder="Search for a City..."
      />
      <button className="rounded-full px-12 py-2  bg-500 text-white text-lg font-bold">
        Search
      </button>
    </form>
  );
}
