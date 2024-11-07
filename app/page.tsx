import { Suspense } from "react";
import { ListingCard } from "./components/ListingCard";
import { MapFilterItems } from "./components/MapFilterItems";
import prisma from "./lib/db";
import { NoItems } from "./components/NoItem";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

async function getData({
  searchParams,
  userId,
}: {
  userId: string | undefined;
  searchParams?: {
    filter?: string;
    country?: string;
    guest?: string;
    room?: string;
    bathroom?: string;
  };
}) {
  return await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedLocation: true,
      addedDescription: true,
      categoryName: searchParams?.filter ?? undefined,
      country: searchParams?.country ?? undefined,
      guests: searchParams?.guest ?? undefined,
      bedrooms: searchParams?.room ?? undefined,
      bathrooms: searchParams?.bathroom ?? undefined,
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      country: true,
      Favorite: {
        where: { userId: userId ?? undefined }, 
      },
    },
  });
}

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
    country?: string;
    guest?: string;
    room?: string;
    bathroom?: string;
  };
}) {
  const { getUser } = getKindeServerSession();
  let user = await getUser();

  // Check for JWT token to determine if this is the admin user
  const token = cookies().get("token")?.value;
  let isAdmin = false;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      const userId = (decoded as { userId: string }).userId;

      // Fetch the user from the database and check isAdmin status
      const jwtUser = await prisma.user.findUnique({
        where: { id: userId },
        select: { isAdmin: true },
      });

      isAdmin = jwtUser?.isAdmin ?? false;
      user = { id: userId, ...user };
    } catch (error) {
      console.error("JWT verification failed:", error);
    }
  }

  return (
    <div className="container mx-auto px-5 lg:px-10">
      <MapFilterItems />

      <Suspense key={searchParams?.filter} fallback={<p> Loading ... </p>}>
        <ShowItems searchParams={searchParams} isAdmin={isAdmin} user={user} />
      </Suspense>
    </div>
  );
}

async function ShowItems({
  searchParams,
  isAdmin,
  user,
}: {
  searchParams?: {
    filter?: string;
    country?: string;
    guest?: string;
    room?: string;
    bathroom?: string;
  };
  isAdmin: boolean;
  user: { id: string } | null;
}) {
  // Fetch data with favorites based on user ID
  const data = await getData({ searchParams: searchParams, userId: user?.id });

  return (
    <>
      {data.length === 0 ? (
        <NoItems description="Please check other categories or create your own listing." title="No listings found for this category."/>
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {data.map((item) => (
            <ListingCard
              key={item.id}
              description={item.description as string}
              imagePath={item.photo as string}
              location={item.country as string}
              price={item.price as number}
              userId={user?.id}
              favoriteId={item.Favorite[0]?.id ?? ""} 
              isInFavoriteList={item.Favorite.length > 0} 
              homeId={item.id}
              pathName="/"
              isAdmin={isAdmin}
            />
          ))}
        </div>
      )}
    </>
  );
}
