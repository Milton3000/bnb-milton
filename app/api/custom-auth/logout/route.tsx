// app/api/custom-auth/logout/route.ts

import { NextResponse } from "next/server";

export async function POST() {
    // Set the 'token' cookie to expire immediately, effectively logging out the user
    const response = NextResponse.json({ message: "Logged out successfully" });
    response.cookies.set("token", "", { httpOnly: true, path: "/", maxAge: 0 });
    return response;
}
