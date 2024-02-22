"use client";

import Link from "next/link";
import type { Session } from "next-auth";
import { PetContext } from "@/context/PetContext ";
import { useEffect, useContext } from "react";

const FrontPageLinks = ({ session }: { session: Session | null }) => {
  const breeds = ["dog", "cat", "other"];

  const { pet, error, findoutIfPet } = useContext(PetContext);

  useEffect(() => {
    if (session && session.user) {
      findoutIfPet(session.user.id);
    }
  }, []);

  return (
    <>
      <div className="relative group text-xl border border-slate-50 rounded-2xl hover:bg-slate-200 mb-10 sm:mb-20">
        Report Lost Pet
        {session && !pet && (
          <ul className="absolute top-8 left-1/4 hidden group-hover:block w-1/2 border-2 border-gray-400 z-10">
            {breeds.map((breed: string) => (
              <li
                key={breed}
                className="bg-slate-200 border-2"
              >
                <Link
                  href={`/registerPet/searchedPet/${breed}`}
                  className="cursor-pointer hover:text-amber-600"
                >
                  {breed}
                </Link>
              </li>
            ))}
          </ul>
        )}
        {!session && (
          <div className="absolute top-8 hidden group-hover:block w-full pb-6 border-2 border-slate-400 rounded-lg bg-slate-100 z-10">
            <p className="text-red-500 text-lg mb-6">
              To post the details of your troubled pet you have to sign up or
              log in first
            </p>
            <Link
              href="/userAuth/login"
              className="text-xl font-bold text-zinc-500 hover:text-lime-600 cursor-pointer"
            >
              Login
            </Link>
            <Link
              href="/userAuth/signup"
              className="text-xl font-bold text-zinc-500 hover:text-lime-600 cursor-pointer ml-6"
            >
              Signup
            </Link>
          </div>
        )}
        {pet && (
          <div className="absolute top-8 hidden group-hover:block w-full pb-6 border-2 border-slate-400 rounded-lg bg-slate-100 z-10">
            <p className="text-red-500 text-lg mb-6">
              To register a new pet you have to delete the existing one first
            </p>
          </div>
        )}
      </div>
      <div className="relative group text-xl border border-slate-50 rounded-2xl hover:bg-slate-200">
        Report Found Pet
        {session && !pet && (
          <ul className="absolute top-8 left-1/4 hidden group-hover:block w-1/2 border-2 border-gray-400 z-10">
            {breeds.map((breed: string) => (
              <li
                key={breed}
                className="bg-slate-200 border-2"
              >
                <Link
                  href={`/registerPet/foundPet/${breed}`}
                  className="cursor-pointer hover:text-amber-600"
                >
                  {breed}
                </Link>
              </li>
            ))}
          </ul>
        )}
        {!session && (
          <div className="absolute top-8 hidden group-hover:block w-full pb-6 border-2 border-slate-400 rounded-lg bg-slate-100 z-10">
            <p className="text-red-500 text-lg mb-6">
              To post the details of your troubled pet you have to sign up or
              log in first
            </p>
            <Link
              href="/userAuth/login"
              className="text-xl font-bold text-zinc-500 hover:text-lime-600 cursor-pointer"
            >
              Login
            </Link>
            <Link
              href="/userAuth/signup"
              className="text-xl font-bold text-zinc-500 hover:text-lime-600 cursor-pointer ml-6"
            >
              Signup
            </Link>
          </div>
        )}
        {pet && (
          <div className="absolute top-8 hidden group-hover:block w-full pb-6 border-2 border-slate-400 rounded-lg bg-slate-100 z-10">
            <p className="text-red-500 text-lg mb-6">
              To register a new pet you have to delete the existing one first
            </p>
          </div>
        )}
      </div>
    </>
  );
};
export default FrontPageLinks;
