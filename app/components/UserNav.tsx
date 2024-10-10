import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import DefaultUser from "../../public/DefaultUser.png";
import Image from "next/image";

export function UserNav () {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
                    <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5"/>

                    <Image src={DefaultUser} alt="Default User" className="w-8 h-8 rounded-full hidden lg:block" />
                </div>
            </DropdownMenuTrigger>
        </DropdownMenu>
    )
}