import prisma from "@/libs/prismadb ";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { breed, category } = body;

  const pets = await prisma.pet.findMany({
    where: {
      AND: [{ breed }, { category }],
    },
  });

  console.log(pets);
  if (pets) {
    return NextResponse.json(pets);
  } else if (!pets) {
    return NextResponse.json(null);
  } else {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
