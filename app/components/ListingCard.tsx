"use client"; // This component uses client-side functionality

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCountries } from "../lib/getCountries";
import { AddToFavoriteButton, DeleteFromFavoriteButton } from "./SubmitButtons";
import { addToFavorite, deleteFromFavorite, deleteProperty } from "../actions";
import { Button } from "@/components/ui/button";

interface iAppProps {
  imagePath: string;
  description: string;
  location: string;
  price: number;
  userId: string;
  isInFavoriteList: boolean;
  favoriteId: string;
  homeId: string;
  pathName: string;
  showActions?: boolean;
}

export function ListingCard({
  description,
  imagePath,
  location,
  price,
  userId,
  favoriteId,
  homeId,
  isInFavoriteList,
  pathName,
  showActions = false,
}: iAppProps) {
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(location);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteProperty(homeId, userId); // Pass both homeId and userId here
      router.refresh();
    } catch (error) {
      console.error("Failed to delete property:", error);
    }
  };
  

  return (
    <div className="flex flex-col">
      <div className="relative h-72">
        <Image
          src={`https://sctnymoriaxapkrjnbfc.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt="Image of Property"
          fill
          className="rounded-lg height-full object-cover"
        />
        {userId && (
          <div className="z-10 absolute top-2 right-2">
            {isInFavoriteList ? (
              <form action={deleteFromFavorite}>
                <input type="hidden" name="favoriteId" value={favoriteId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <DeleteFromFavoriteButton />
              </form>
            ) : (
              <form action={addToFavorite}>
                <input type="hidden" name="homeId" value={homeId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <AddToFavoriteButton />
              </form>
            )}
          </div>
        )}
      </div>

      <Link href={`/home/${homeId}`} className="mt-2">
        <h3 className="font-medium text-base">
          {country?.flag} {country?.label} / {country?.region}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>
        <p className="pt-2 text-muted-foreground">
          <span className="font-medium text-black"> ${price} </span> / Night
        </p>
      </Link>

      {showActions && (
        <div className="flex space-x-2 mt-2">
          <Link href={`/my-listings/edit/${homeId}`}>
            <Button variant="default" size="sm">Edit</Button>
          </Link>
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}
