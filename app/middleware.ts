import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET!);
      return NextResponse.next();
    } catch (err) {
      console.error(err);
      return NextResponse.redirect("/login");
    }
  } else {
    return NextResponse.redirect("/login");
  }
}

export const config = {
  matcher: ["/protected-route", "/my-listings", "/bookings"],
};
