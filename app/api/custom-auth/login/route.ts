import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await bcrypt.compare(password, user.password!))) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  const response = NextResponse.json({ message: "Login successful" });
  response.cookies.set("token", token, { httpOnly: true, maxAge: 86400 });
  return response;
}
