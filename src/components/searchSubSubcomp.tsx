import type { Pet } from "../../types/types";
import Image from "next/image";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const SearchSubSubcomp = ({
  pet,
  toggleDisplay,
  index,
}: {
  pet: Pet;
  toggleDisplay: (index: number) => void;
  index: number;
}) => {
  const [picture, setPicture] = useState(true);
  const [description, setDescription] = useState(false);
  const [contacts, setContacts] = useState(false);

  const toggle = () => {
    if (picture) {
      setDescription(true);
      setPicture(false);
    } else if (description) {
      setContacts(true);
      setDescription(false);
    } else {
      setPicture(true);
      setContacts(false);
    }
  };

  return (
    <section className="absolute top-0 bottom-0 inset-x-0 bg-slate-100 overflow-y-auto">
      <div className="grid grid-cols-1 place-items-center px-4 mt-40">
        <h1 className="text-sm text-lime-600 text-center mb-16">
          Click on box to toggle between Picture, Description and Contact
          Details.
        </h1>
        {picture && (
          <div
            className="relative w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] border-2 rounded-md bg-slate-200"
            onClick={toggle}
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
              <h1 className="text-lg sm:text-xl text-center text-red-500 mt-16">
                Picture not included
              </h1>
            )}
          </div>
        )}
        {description && (
          <Description
            description={pet.description}
            toggle={toggle}
          />
        )}
        {contacts && (
          <Contacts
            owner={pet.owner}
            toggle={toggle}
          />
        )}
        <div className="flex justify-center text-xl">
          <FaArrowLeft className="mt-7 mr-2" />{" "}
          <span
            className="hover:text-lime-500 cursor-pointer mt-6"
            onClick={() => toggleDisplay(index)}
          >
            Go Back
          </span>
        </div>
      </div>
    </section>
  );
};
export default SearchSubSubcomp;

const Description = ({
  description,
  toggle,
}: {
  description: string;
  toggle: () => void;
}) => {
  return (
    <div
      className="w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] border-2 p-3 bg-slate-200 rounded-md overflow-y-auto"
      onClick={() => toggle()}
    >
      <h1 className="font-bold text-lg text-center mb-2">Description</h1>
      <p>{description}</p>
    </div>
  );
};

const Contacts = ({
  owner,
  toggle,
}: {
  owner: {
    name: string;
    userId: string;
    address?: string | null;
    email?: string | null;
    phoneNumber: string;
  };
  toggle: () => void;
}) => {
  return (
    <div
      className="w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] border-2 p-2 bg-slate-200 rounded-md overflow-y-auto"
      onClick={() => toggle()}
    >
      <h1 className="font-bold text-sm sm:text-lg text-center mb-6"></h1>
      <div className="grid place-content-center text-sm sm:text-lg p-8">
        <p className="mb-4">
          Name: <span className="font-bold">{owner.name}</span>
        </p>
        <p>Address:</p>
        <p className="font-bold">{owner.address}</p>
        <p className="my-4">
          Email: <span className="font-bold">{owner.email}</span>
        </p>
        <p>
          Phone: <span className="font-bold">{owner.phoneNumber}</span>
        </p>
      </div>
    </div>
  );
};
