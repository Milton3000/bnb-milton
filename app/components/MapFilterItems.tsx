import Link from "next/link";
import { categoryItems } from "../lib/categoryItems";
import Image from "next/image";

export function MapFilterItems () {
    return (
        <div>
            {categoryItems.map((item) => (
                <Link key={item.id} href="">
                <div className="relative w-6 h-6">
                    <Image src={item.imageUrl} alt="Category Image" className="w-6 h-6"
                    width={24}
                    height={24}
                    />
                </div>
                </Link>
            ))}
        </div>
    );
}