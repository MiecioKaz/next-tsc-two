import prisma from "@/libs/prismadb ";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { id } = body;

  const pet = await prisma.pet.findFirst({
    where: {
      owner: {
        is: {
          userId: id,
        },
      },
    },
  });
  console.log(pet);
  if (pet) {
    const requiredData = {
      petId: pet.id,
      petImgUrl: pet.petImgData.imgUrl,
      petImgId: pet.petImgData.imgId,
    };
    return NextResponse.json(requiredData);
  } else if (!pet) {
    return NextResponse.json(null);
  } else {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
