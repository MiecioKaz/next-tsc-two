import Link from "next/link";

const Search = () => {
  const breeds = ["dog", "cat", "other"];

  return (
    <section className="absolute bottom-32 sm:top-20 inset-x-0">
      <div className="flex justify-evenly mt-28">
        <div className="relative group text-lg font-bold hover:text-lime-700 text-center cursor-pointer">
          List of Lost Pets
          <ul className="absolute hidden group-hover:block w-full bg-gray-400">
            {breeds.map((breed) => (
              <li
                className="hover:text-lime-400 cursor-pointer"
                key={breed}
              >
                <Link href={`/search/searchedPet/${breed}`}>{breed}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative group text-lg font-bold hover:text-lime-700 text-center cursor-pointer">
          List of Found Pets
          <ul className="absolute hidden group-hover:block w-full bg-gray-400">
            {breeds.map((breed) => (
              <li
                className="hover:text-lime-400 cursor-pointer"
                key={breed}
              >
                <Link href={`/search/foundPet/${breed}`}>{breed}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
export default Search;
