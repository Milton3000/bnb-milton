import Image from "next/image";
import Link from "next/link";

export function Navbar() {
    return (
        <nav className="w-full border-b">
<div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
<Link href="/">
<Image />
</Link>
</div>
        </nav>
    )
}