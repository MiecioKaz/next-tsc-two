import SearchSubcomp from "@/components/searchSubcomp ";
import prisma from "@/libs/prismadb ";

const getPets = async (category: string, breed: string) => {
  try {
    const pets = await prisma.pet.findMany({
      where: {
        AND: [{ breed }, { category }],
      },
    });

    return pets;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

const SearchList = async ({
  params,
}: {
  params: { category: string; breed: string };
}) => {
  const { category, breed } = params;

  const pets = await getPets(category, breed);

  if (typeof pets !== "undefined" && pets.length !== 0) {
    return <SearchSubcomp pets={pets} />;
  } else if (typeof pets !== "undefined" && pets.length === 0) {
    return (
      <h1 className="text-center text-xl text-red-700 font-bold mt-40">
        No registered pets matching your enquiry yet!
      </h1>
    );
  } else {
    throw new Error("Oops! Something went wrong!");
  }
};
export default SearchList;
