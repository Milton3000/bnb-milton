import Image from "next/image";
import Link from "next/link";
import { useCountries } from "../lib/getCountries";

interface iAppProps {
  imagePath: string;
  description: string;
  location: string;
  price: number;
}

export function ListingCard({
  description,
  imagePath,
  location,
  price,
}: iAppProps) {

    const {getCountryByValue} = useCountries();
    const country = getCountryByValue(location);

// console.log(imagePath)
  return (
    <div className="flex flex-col">
      <div className="relative h-72">
        <Image
          src={`https://sctnymoriaxapkrjnbfc.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt="Image of Property"
          fill
          className="rounded-lg height-full object-cover mb-3"
        />
      </div>
      <Link href="/">
      <h3 className="font-medium text-base">
    {country?.flag} {country?.label} / {country?.region}
      </h3>
      <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
      <p className="pt-2 text-muted-foreground">
        <span className="font-medium text-black"> ${price} </span> / Night
      </p>
      </Link>
    </div>
  );
}
