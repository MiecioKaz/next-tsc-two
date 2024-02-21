"use client";

import { useState } from "react";
import type { Pet } from "../../types/types";
import Image from "next/image";
import SearchSubSubcomp from "./searchSubSubcomp";

const SearchSubcomp = ({ pets }: { pets: Pet[] }) => {
  const [index, setIndex] = useState(-1);
  const [display, setDisplay] = useState(false);

  const toggleDisplay = (index: number) => {
    setIndex(index);
    setDisplay(!display);
  };

  return (
    <section className="absolute top-20 bottom-0 inset-x-0 bg-gray-100">
      <h1 className="text-xl text-lime-900 font-bold text-center mt-16">
        The list of registered,{" "}
        {pets[0].category === "searchedPet" ? "lost" : "found"} pets
      </h1>
      <h2 className="text-center text-sm text-lime-600 mt-4 mb-10">
        Click on picture to reveal pet details.
      </h2>

      <div className="absolute top-32 bottom-0 inset-x-0 flex flex-row justify-center flex-wrap content-start gap-6 w-11/12 py-8 mx-auto overflow-auto">
        {pets.map((pet: Pet, index: number) => (
          <div
            key={pet.id}
            onClick={() => toggleDisplay(index)}
            className="relative w-[200px] h-[200px] mx-auto border-2 bg-slate-200 rounded-md"
          >
            {pet.petImgData.imgUrl !== "" ? (
              <Image
                src={pet.petImgData.imgUrl}
                fill
                sizes="33vw"
                className="object-cover object-center rounded-md"
                alt="Pet Picture"
              />
            ) : (
              <h1 className="text-lg text-center text-red-600 mt-10">
                Picture not included
              </h1>
            )}
          </div>
        ))}
      </div>
      {display && (
        <SearchSubSubcomp
          pet={pets[index]}
          toggleDisplay={toggleDisplay}
          index={index}
        />
      )}
    </section>
  );
};
export default SearchSubcomp;
