"use client";

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
  isAdmin?: boolean;
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
  isAdmin = false,
}: iAppProps) {
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(location);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteProperty(homeId, userId);
      router.refresh();
    } catch (error) {
      console.error("Failed to delete property:", error);
    }
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="relative h-72 mb-4">
        <Image
          src={`https://sctnymoriaxapkrjnbfc.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt="Image of Property"
          fill
          className="rounded-lg object-cover"
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

      <Link href={`/home/${homeId}`} className="flex-grow flex flex-col justify-between">
        <div>
          <h3 className="font-medium text-base">
            {country?.flag} {country?.label} / {country?.region}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
            {description}
          </p>
        </div>
        <p className="font-semibold text-black text-lg mt-2">
          ${price} <span className="text-sm text-muted-foreground">/ Night</span>
        </p>
      </Link>

      {/* Button Section */}
      <div className="flex justify-between items-center mt-4">
        {showActions && (
          <div className="flex space-x-2">
            <Link href={`/my-listings/edit/${homeId}`}>
              <Button variant="default" size="sm">Edit</Button>
            </Link>
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        )}

        {!showActions && isAdmin && (
          <div className="flex justify-end">
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
