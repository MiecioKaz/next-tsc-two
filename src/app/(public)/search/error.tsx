"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="w-1/2 text-xl mx-auto mt-40">
      <h2 className="text-center text-red-400">Something went wrong!</h2>
      <button
        className="w-full text-center text-gray-600 hover:text-gray-400 font-bold mx-auto mt-4"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
