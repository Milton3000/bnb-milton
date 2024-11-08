import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import {unstable_noStore as noStore} from "next/cache";

export async function GET() {
    noStore();
    const {getUser} = getKindeServerSession();

// First we fetch the user, if there's no user, we throw an error (below)
    const user = await getUser();

    if(!user || user === null || !user.id) {
        throw new Error("User not found");
    }
// If we have a user we fetch the user from the db
    let dbUser = await prisma.user.findUnique({
        where: {
            id: user.id
        },
    });
// then we check if we have a user in the db, if not we create a new user + redirect
    if(!dbUser) {
        dbUser = await prisma.user.create({
            data: {
                email: user.email ?? "",
                firstName: user.given_name ?? "",
                lastName: user.family_name ?? "",
                id: user.id,
                profileImage: user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
                password: "placeholder-password",
            },
        });
        
    }

    return NextResponse.redirect("https://bnb-milton.vercel.app");
}