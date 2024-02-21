"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const LoginForm = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [oauthError, setOauthError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoad, setGoogleLoad] = useState(false);
  const [twitterLoad, setTwitterLoad] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const loginUser = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    signIn("credentials", {
      ...formValues,
      redirect: false,
    })
      .then((res) => {
        console.log(res);
        if (res && res.ok) {
          router.push("/");
        } else {
          if (res && res.error) {
            setLoading(false);
            setFormValues({ email: "", password: "" });
            setError(res.error);
          }
        }
      })
      .catch((error) => {
        console.error(error.message);
        setLoading(false);
        setFormValues({ email: "", password: "" });
        setError(error.message);
      });
  };

  const googleLogin = () => {
    setGoogleLoad(true);
    signIn("google")
      .then(() => {
        if (session) {
          setGoogleLoad(false);
        }
      })
      .catch(() => {
        if (!session) {
          setOauthError("Google signing in failed");
          setGoogleLoad(false);
        }
      });
  };

  const twitterLogin = async () => {
    setTwitterLoad(true);
    signIn("twitter")
      .then(() => {
        if (session) {
          setTwitterLoad(false);
        }
      })
      .catch(() => {
        if (!session) {
          setOauthError("Twitter signing in failed");
          setTwitterLoad(false);
        }
      });
  };

  return (
    <div className="grid grid-cols-1 place-items-center">
      <div className="w-[300px] sm:w-[400px] shadow-lg mt-40 sm:mt-72 p-5 rounded-lg bg-slate-100 border-t-4 border-amber-700">
        <h1 className="text-xl font-bold my-4 text-center">
          Signin with Email & Password
        </h1>

        <form
          onSubmit={loginUser}
          className="flex flex-col gap-3"
        >
          <input
            required
            type="email"
            name="email"
            onChange={(e) =>
              setFormValues({ ...formValues, email: e.target.value })
            }
            value={formValues.email}
            placeholder="Email Address"
            className="border border-gray-200 py-1 sm:py-2 px-6 bg-zinc-100/40"
          />
          <input
            required
            type="password"
            name="password"
            onChange={(e) =>
              setFormValues({ ...formValues, password: e.target.value })
            }
            value={formValues.password}
            placeholder="Password"
            className="border border-gray-200 py-1 sm:py-2 px-6 bg-zinc-100/40"
          />
          <button
            type="submit"
            className="bg-amber-700 hover:bg-amber-400 text-white font-bold cursor-pointer px-6 py-1 sm:py-2"
            disabled={loading}
          >
            {loading ? "loading..." : "Login"}
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link
            className="text-sm mt-3 text-right"
            href="/userAuth/signup"
          >
            Do not have an account?{" "}
            <span className="font-bold hover:underline">Register</span>
          </Link>
        </form>
      </div>
      <button
        onClick={googleLogin}
        className="w-[300px] sm:w-[400px] mt-10 mb-4 bg-slate-800 hover:bg-slate-400 text-white font-bold cursor-pointer px-6 py-1 sm:py-2"
      >
        {googleLoad ? "loading..." : "Google Signin"}
      </button>
      {oauthError && (
        <div className="w-[200px] sm:w-[400px] text-center text-red-400 text-lg my-4">
          {oauthError}
        </div>
      )}
      <button
        onClick={twitterLogin}
        className="w-[300px] sm:w-[400px] bg-slate-800 hover:bg-slate-400 text-white font-bold cursor-pointer px-6 py-1 sm:py-2"
      >
        {twitterLoad ? "loading..." : "Twitter Signin"}
      </button>
    </div>
  );
};
export default LoginForm;
