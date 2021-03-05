export default function SearchBar() {
  return (
    <div className="bg-gray-300 w-full h-24">
      <div className="relative flex justify-center items-center p-4 ">
        <label className="sr-only" htmlFor="search">
          Search
        </label>
        <input
          type="text"
          name="search"
          placeholder="Where do you want to go?"
          className="p-4 w-1/2 border-b focus:outline-none focus:border-gray-900"
        />
        <button className="flex items-stretch justify-center px-8 py-4 border-b border-gray-900 text-base text-white font-medium bg-gray-900">
          Search
        </button>
      </div>
    </div>
  );
}
