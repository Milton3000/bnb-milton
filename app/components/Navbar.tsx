import Image from "next/image";
import Link from "next/link";
// import dreambnb from "../../public/dreambnb.png";
import DreamBnBTrans from "../../public/DreamBnBTrans.png";
import { UserNav } from "./UserNav";
import { SearchModalComponent } from "./SearchComponent";

export function Navbar() {
  return (
    <nav className="w-full border-b bg-gray-50">
      <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
        <Link href="/">
          <Image
            src={DreamBnBTrans}
            alt="Desktop Logo"
            className="w-32 hidden lg:block"
          />

          <Image
            src={DreamBnBTrans}
            alt="Mobile Logo"
            className="block lg:hidden w-12"
          />
        </Link>
        <SearchModalComponent />
        <UserNav />
      </div>
    </nav>
  );
}
