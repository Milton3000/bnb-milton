import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import DefaultUser from "../../public/DefaultUser.png";
import Image from "next/image";
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";

export async function UserNav() {

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
                    <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />

                    <Image src={user?.picture ?? DefaultUser} alt="User" width={32} height={32} className="w-8 h-8 rounded-full hidden lg:block" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
                {user ? (
                    <>
                    <DropdownMenuItem>
                    <Link href="/my-homes" className="w-full">
                    My Listings
                    </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                    <Link href="/favorites" className="w-full">
                    My Favorites
                    </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                    <Link href="/reservations" className="w-full">
                    My Reserverations
                    </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogoutLink className="w-full">
                                Logout
                            </LogoutLink>
                        </DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuItem>
                            <RegisterLink className="w-full">
                                Register
                            </RegisterLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <LoginLink className="w-full">
                                Login
                            </LoginLink>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}