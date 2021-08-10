export default function Search() {
  return (
    <form className="w-50 flex shadow-2xl justify-center mt-11 font-sand">
      <input
        type="search"
        className="bg-white -mr-12 rounded-full flex-base px-10 py-4"
        name="city"
        placeholder="Search for a City..."
      />
      <button className="rounded-full px-12 py-2  bg-500 text-white text-lg font-bold">
        Search
      </button>
    </form>
  );
}
