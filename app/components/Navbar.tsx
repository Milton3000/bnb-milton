import Image from "next/image";
import Link from "next/link";
import DesktopLogo from "../../public/airbnb-desktop.png"
// import MobileLogo from "../../public/airbnb-mobile.png"

export function Navbar() {
    return (
        <nav className="w-full border-b">
            <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
                <Link href="/">
                    <Image src={DesktopLogo} alt="Desktop Logo" className="w-42" />
                </Link>
            </div>
        </nav>
    )
}