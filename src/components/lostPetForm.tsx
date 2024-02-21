"use client";

import { useState } from "react";
import Image from "next/image";
import crypto from "crypto";
import { useCloudinary } from "@/hooks/useCloudinary ";
import { useMongoDB } from "@/hooks/useMongo ";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LostPetForm = ({
  category,
  breed,
}: {
  category: string;
  breed: string;
}) => {
  const [formValues, setFormValues] = useState({
    description: "",
    name: "",
    address: "",
    email: "",
    phoneNumber: "",
  });
  const [imageData, setImageData] = useState({ imgUrl: "", imgId: "" });
  const [error, setError] = useState("");
  const [imgError, setImgError] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [imgIsLoading, setImgIsloading] = useState(false);
  const { cloudinaryUpload, cloudinaryDelete } = useCloudinary(crypto);
  const { createPet } = useMongoDB();
  const { data: session } = useSession();
  const router = useRouter();

  const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    let selected: File = e.target.files[0];

    uploadImage(selected);
  };

  const uploadImage = async (petImage: File) => {
    setImgIsloading(true);
    try {
      const image = await cloudinaryUpload(petImage);
      if (image) {
        const {
          secure_url,
          public_id,
        }: { secure_url: string; public_id: string } = image;

        setImageData({ ...imageData, imgUrl: secure_url, imgId: public_id });
        setImgIsloading(false);
      } else if (image.error) {
        setImgError(image.error.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        setImgError(error.message);
      }
    }
  };

  const deleteImage = async () => {
    if (imageData.imgId !== "") {
      const response = await cloudinaryDelete(imageData.imgId);
      if (response.result === "ok" || response.result === "not found") {
        setImageData({ imgUrl: "", imgId: "" });
      } else {
        setImgError(response.error.message);
      }
    }
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsloading(true);
    const petDetails = { category, breed, description: formValues.description };
    const contactDetails = {
      name: formValues.name,
      userId: session!.user.id,
      address: formValues.address,
      email: formValues.email,
      phoneNumber: formValues.phoneNumber,
    };
    const result = await createPet(petDetails, imageData, contactDetails);
    if (!result.error) {
      setIsloading(false);
      router.push("/");
    } else if (result.error) {
      setIsloading(false);
      setError(result.error);
    } else {
      setIsloading(false);
      setError("Oops! Something went wrong");
    }
  };

  return (
    <>
      {!error && (
        <h1 className="text-2xl font-bold mt-20 text-center">
          Register Pet Details
        </h1>
      )}
      {error && (
        <h1 className="text-2xl font-bold mt-20 text-center text-red-400">
          {error}
        </h1>
      )}
      <form
        onSubmit={submitForm}
        className="grid grid-cols-2 gap-4 place-items-center mx-auto mt-16"
      >
        <div className="relative col-span-2 w-[300px] h-[300px] text-center bg-rose-200">
          {imageData.imgUrl === "" && (
            <div className="w-1/2 h-9 p-1 mt-40 mx-auto border-2 rounded-md bg-stone-400 hover:bg-stone-600 text-white">
              <label
                htmlFor="img-select"
                className=""
              >
                {!imgIsLoading ? "Upload Pet Image" : "...loading"}
              </label>
              <input
                id="img-select"
                type="file"
                className="hidden"
                onChange={fileChange}
              />
            </div>
          )}
          {imageData.imgUrl !== "" && (
            <>
              <Image
                src={imageData.imgUrl}
                fill
                sizes="33vw"
                className="object-cover object-center rounded-md"
                alt="Pet picture"
              />
              <div
                className="absolute bottom-6 left-10 h-9 p-1 border-2 rounded-md bg-white hover:bg-zinc-400 cursor-pointer"
                onClick={deleteImage}
              >
                Don't like? Delete & replace
              </div>
            </>
          )}
          {imgError && <p className="text-sm text-red-400 mb-4">{imgError}</p>}
        </div>
        <div className="grid place-items-center w-[400px] h-[400px] bg-blue-200">
          <h1>Description</h1>
          <textarea
            name="description"
            placeholder="Pet Description (Required)"
            required
            cols={30}
            rows={12}
            className="p-2"
            onChange={(e) =>
              setFormValues({ ...formValues, description: e.target.value })
            }
            value={formValues.description}
          ></textarea>
        </div>
        <div className="grid place-items-center w-[400px] h-[400px] bg-green-200">
          <h1 className="">Contact details</h1>
          <input
            type="text"
            name="name"
            required
            placeholder="Name (Required)"
            className="h-9 w-10/12 p-2"
            onChange={(e) =>
              setFormValues({ ...formValues, name: e.target.value })
            }
            value={formValues.name}
          />
          <input
            type="text"
            name="address"
            placeholder="Address (Optional)"
            className="h-9 w-10/12 p-2"
            onChange={(e) =>
              setFormValues({ ...formValues, address: e.target.value })
            }
            value={formValues.address}
          />
          <input
            type="text"
            name="email"
            placeholder="Email (Optional)"
            className="h-9 w-10/12 p-2"
            onChange={(e) =>
              setFormValues({ ...formValues, email: e.target.value })
            }
            value={formValues.email}
          />
          <input
            type="text"
            name="phoneNumber"
            required
            placeholder="Phone Number (Required)"
            className="h-9 w-10/12 p-2"
            onChange={(e) =>
              setFormValues({ ...formValues, phoneNumber: e.target.value })
            }
            value={formValues.phoneNumber}
          />
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            className="w-48 h-9 my-10 border-2 rounded-md bg-stone-400 hover:bg-stone-600 text-white"
            // onClick={submitForm}
          >
            {isLoading ? "Loading..." : "Register"}
          </button>
        </div>
      </form>
    </>
  );
};
export default LostPetForm;
