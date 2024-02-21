import axios, { AxiosResponse } from "axios";

type PetDetails = {
  category: string;
  breed: string;
  description: string;
};
type ImgData = {
  imgUrl: string;
  imgId: string;
};
type ContactDetails = {
  name: string;
  userId: string;
  address: string;
  email: string;
  phoneNumber: string;
};

export const useMongoDB = () => {
  const createPet = async (
    petDetails: PetDetails,
    imgData: ImgData,
    contactDetails: ContactDetails
  ) => {
    try {
      const response: AxiosResponse = await axios.post("/api/create-pet", {
        petDetails,
        imgData,
        contactDetails,
      });
      const responseData = response.data;
      return responseData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response?.statusText;
      } else {
        if (error instanceof Error) {
          return error.message;
        }
      }
    }
  };

  const getPet = async (id: string) => {
    try {
      const response: AxiosResponse = await axios.post("/api/get-pet", { id });
      const responseData = response.data;
      console.log(responseData);
      return responseData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response?.statusText;
      } else {
        if (error instanceof Error) {
          return error.message;
        }
      }
    }
  };

  const getPets = async (breed: string, category: string) => {
    try {
      const response: AxiosResponse = await axios.post("/api/get-pets", {
        breed,
        category,
      });
      const responseData = response.data;
      console.log(responseData);
      return responseData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response?.statusText;
      } else {
        if (error instanceof Error) {
          return error.message;
        }
      }
    }
  };

  const deletePet = async (petId: string) => {
    try {
      const response: AxiosResponse = await axios.post("/api/delete-pet", {
        petId,
      });
      const responseData = response.data;
      return responseData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response?.statusText;
      } else {
        if (error instanceof Error) {
          return error.message;
        }
      }
    }
  };
  return { createPet, getPet, getPets, deletePet };
};
