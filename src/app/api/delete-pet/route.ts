import prisma from "@/libs/prismadb ";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { petId } = body;

  const deletePet = await prisma.pet.delete({
    where: {
      id: petId,
    },
  });
  console.log(deletePet);
  if (deletePet) {
    const requiredData = {
      petId: deletePet.id,
    };
    return NextResponse.json(requiredData);
  } else {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
