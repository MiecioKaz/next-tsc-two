import prisma from "@/libs/prismadb ";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { petDetails, imgData, contactDetails } = body;

  const pet = await prisma.pet.create({
    data: {
      ...petDetails,
      petImgData: imgData,
      owner: contactDetails,
    },
  });
  if (pet) {
    const requiredData = {
      petId: pet.id,
      petImgUrl: pet.petImgData.imgUrl,
      petImgId: pet.petImgData.imgId,
    };
    return NextResponse.json(requiredData);
  } else {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
