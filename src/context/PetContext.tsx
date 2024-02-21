"use client";

import { createContext, useState } from "react";
import { useMongoDB } from "@/hooks/useMongo ";
import { useCloudinary } from "@/hooks/useCloudinary ";
import crypto from "crypto";

export const PetContext = createContext<{
  pet: { petId: string; petImgUrl: string; petImgId: string } | null;
  error: string;
  findoutIfPet: (id: string) => void;
  removePet: () => void;
}>({
  pet: null,
  error: "",
  findoutIfPet: (id: string) => {},
  removePet: () => {},
});

export const PetContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [pet, setPet] = useState<{
    petId: string;
    petImgUrl: string;
    petImgId: string;
  } | null>(null);
  const [error, setError] = useState("");
  const { getPet, deletePet } = useMongoDB();
  const { cloudinaryDelete } = useCloudinary(crypto);

  const findoutIfPet = async (id: string) => {
    const result = await getPet(id);
    if (result) {
      setPet(result);
      setError("");
    } else {
      setPet(null);
    }
  };

  const removePet = async (): Promise<void> => {
    if (!pet) return;
    const result = await deletePet(pet.petId);
    console.log(result);
    if (result && pet.petImgId !== "") {
      const response = await cloudinaryDelete(pet.petImgId);
      if (response.result === "ok" || response.result === "not found") {
        setPet(null);
      } else {
        setError("Oops, something went wrong!");
      }
    } else if (result && pet.petImgId === "") {
      setPet(null);
    } else {
      setError("Oops, something went wrong!");
    }
  };

  const context = { pet, error, findoutIfPet, removePet };

  return <PetContext.Provider value={context}>{children}</PetContext.Provider>;
};
