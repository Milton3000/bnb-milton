import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import { NoItems } from "../components/NoItem";
import { ListingCard } from "../components/ListingCard";

// Fetch listings for the logged-in user on the server
async function fetchData(userId: string) {
  return prisma.home.findMany({
    where: {
      userId: userId,
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
    },
    select: {
      id: true,
      country: true,
      photo: true,
      description: true,
      price: true,
      Favorite: {
        where: {
          userId: userId,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export default async function MyListings() {
  const session = await getKindeServerSession();
  const user = await session.getUser();

  if (!user) {
    return redirect("/");
  }

  const listings = await fetchData(user.id);

  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight"> Your Listings </h2>

      {listings.length === 0 ? (
        <NoItems
          description="Please list a home to get started."
          title="You don't have any listings."
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
          {listings.map((item) => (
            <ListingCard
              key={item.id}
              imagePath={item.photo ?? ""}
              homeId={item.id}
              price={item.price ?? 0}
              description={item.description ?? ""}
              location={item.country ?? ""}
              userId={user.id}
              pathName="/my-listings"
              favoriteId={item.Favorite[0]?.id ?? ""}
              isInFavoriteList={item.Favorite.length > 0}
              showActions={true}
            />
          ))}
        </div>
      )}
    </section>
  );
}
