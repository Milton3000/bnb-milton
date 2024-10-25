import Image from "next/image";
import Link from "next/link";
import dreambnb from "../../public/dreambnb.png"
import { UserNav } from "./UserNav";

export function Navbar() {
    return (
        <nav className="w-full border-b">
            <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
                <Link href="/">
                    <Image src={dreambnb} alt="Desktop Logo" className="w-32 hidden lg:block" />

                    <Image src={dreambnb} alt="Mobile Logo" className="block lg:hidden w-12" />
                </Link>
                <div className="rounded-full border px-5 py-2">
                    <h1>Start with Search</h1>
                </div>

                <UserNav />
            </div>
        </nav>
    )
}