import { Suspense } from "react";
import { ListingCard } from "./components/ListingCard";
import { MapFilterItems } from "./components/MapFilterItems";
import prisma from "./lib/db";
import { NoItems } from "./components/NoItem";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function getData({
  searchParams,
  userId,
}: {
  userId: string | undefined;
  searchParams?: {
    filter?: string;
  };
}) {
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedLocation: true,
      addedDescription: true,
      categoryName: searchParams?.filter ?? undefined,
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      country: true,
      Favorite: {
        where: {
          userId: userId ?? undefined,
        },
      },
    },
  });
  return data;
}

export default function Home({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
  };
}) {
  return (
    <div className="container mx-auto px-5 lg:px-10">
      <MapFilterItems />

      <Suspense key={searchParams?.filter} fallback={<p> Loading ... </p>}>
        <ShowItems searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function ShowItems({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
  };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData({ searchParams: searchParams, userId: user?.id });

  return (
    <>
      {data.length === 0 ? (
        <NoItems />
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
            />
          ))}
        </div>
      )}
    </>
  );
}
