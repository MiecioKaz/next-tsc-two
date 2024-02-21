export type Pet = {
  id: string;
  petImgData: { imgUrl: string; imgId: string };
  category: string;
  breed: string;
  description: string;
  createdAt: Date;
  owner: {
    name: string;
    userId: string;
    address?: string | null;
    email?: string | null;
    phoneNumber: string;
  };
};
