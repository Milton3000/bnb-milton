/* eslint-disable @typescript-eslint/no-unused-vars */
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import DefaultUser from "../../public/DefaultUser.png";
import Image from "next/image";
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { createHome } from "../actions";
import jwt from "jsonwebtoken";
import prisma from "../lib/db";
import { cookies } from "next/headers";
import { JWTLogoutButton } from "./JWTLogoutButton";

interface JWTUser {
  id: string;
  firstName: string;
  lastName: string;
  profileImage: string | null;
  isAdmin: boolean;
}

export async function UserNav() {
    const { getUser } = getKindeServerSession();
    const kindeUser = await getUser(); 
    let jwtUser: JWTUser | null = null;
    let isJWTSession = false;
    let isAdmin = false;

    if (!kindeUser) {
        const token = cookies().get("token")?.value;

        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
                const userId = decoded.userId;
                
                jwtUser = await prisma.user.findUnique({
                    where: { id: userId },
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        profileImage: true,
                        isAdmin: true,
                    },
                });

                if (jwtUser) {
                    isJWTSession = true;
                    isAdmin = jwtUser.isAdmin;
                }
            } catch (error) {
                console.error("JWT verification failed:", error);
            }
        }
    }

    // Determine the user image depending on session type
    const userImage = jwtUser?.profileImage || kindeUser?.picture || DefaultUser;
    const createHomeWithId = jwtUser ? createHome.bind(null, { userId: jwtUser.id }) : null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
                    <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
                    <Image src={userImage} alt="User" width={32} height={32} className="w-8 h-8 rounded-full hidden lg:block" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
                {jwtUser || kindeUser ? (
                    <>
                        <DropdownMenuItem>
                            <form action={createHomeWithId!} className="w-full">
                                <button type="submit" className="w-full text-start">
                                    List Your Home
                                </button>
                            </form>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/my-listings" className="w-full">
                                My Listings
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/favorites" className="w-full">
                                My Favorites
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/bookings" className="w-full">
                                My Bookings
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            {isJWTSession ? (
                                <JWTLogoutButton />
                            ) : (
                                <LogoutLink className="w-full">
                                    Logout
                                </LogoutLink>
                            )}
                        </DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuItem>
                            <Link href="/custom-register" className="w-full">
                                Register (JWT)
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/custom-login" className="w-full">
                                Login (JWT)
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <RegisterLink className="w-full">
                                Register (Kinde)
                            </RegisterLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <LoginLink className="w-full">
                                Login (Kinde)
                            </LoginLink>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
