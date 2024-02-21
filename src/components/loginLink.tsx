"use client";

import LoginlinkSubcomp from "./loginlinkSubcomp";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const LoginLink = () => {
  const { data: session } = useSession();

  const pathname = usePathname();
  const active = "/userAuth/login" === pathname;

  if (session) {
    return (
      <div className="relative">
        <h1
          className="hover:text-yellow-600 cursor-pointer"
          onClick={() => signOut()}
        >
          Logout
        </h1>

        <div className="absolute top-10 -left-36 w-60 text-center">
          <h1 className="text-sm sm:text-lg font-bold text-fuchsia-700">
            Hello, {session.user.name}
          </h1>

          <LoginlinkSubcomp session={session} />
        </div>
      </div>
    );
  } else {
    return (
      <Link
        href="/userAuth/login"
        className={
          active
            ? "underline underline-offset-4"
            : "hover:text-yellow-600 cursot-pointer"
        }
      >
        Login
      </Link>
    );
  }
};
export default LoginLink;
