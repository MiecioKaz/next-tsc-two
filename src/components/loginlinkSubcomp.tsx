"use client";

import type { Session } from "next-auth";
import { useEffect } from "react";
import { useContext } from "react";
import { PetContext } from "@/context/PetContext ";
import { useRouter } from "next/navigation";

const LoginlinkSubcomp = ({ session }: { session: Session }) => {
  const { pet, error, findoutIfPet, removePet } = useContext(PetContext);
  const router = useRouter();

  useEffect(() => {
    findoutIfPet(session.user.id);
  }, []);

  return (
    <>
      {pet && (
        <div className="w-full">
          <h1 className="text-sm mb-2">One pet regestered</h1>
          <h1 className="text-sm sm:text-lg">
            Want to remove?{" "}
            <span
              onClick={() => {
                removePet();
                router.push("/");
              }}
              className="text-fuchsia-500 hover:text-fuchsia-800 border-2 border-gray-700 rounded-lg cursor-pointer"
            >
              Click!
            </span>
          </h1>
        </div>
      )}
      {error && (
        <div className="w-full text-lg text-red-400 text-center">
          Something unexpected happened!
        </div>
      )}
    </>
  );
};
export default LoginlinkSubcomp;
