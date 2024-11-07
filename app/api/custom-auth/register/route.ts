import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { email, password, firstName, lastName } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });
    return NextResponse.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json({ error: "Failed to register user" }, { status: 500 });
  }
}
