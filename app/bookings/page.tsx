import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ListingCard } from "../components/ListingCard";
import { NoItems } from "../components/NoItem";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import CancelBookingButton from "../components/CancelBookingButton";

async function getData(userId: string) {
  const data = await prisma.booking.findMany({
    where: {
      userId: userId,
      Home: {
        isNot: null,
      },
    },
    select: {
      id: true,
      totalPrice: true,
      startDate: true,
      endDate: true,
      Home: {
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
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  return data;
}

export default async function BookingsRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user?.id) return redirect("/");

  const data = await getData(user.id);

  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">
        Your Reservations
      </h2>

      {data.length === 0 ? (
        <NoItems
          title="You don't have any reservations."
          description="Please book a home to see them here."
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
          {data.map((item) => (
            <div key={item.id} className="relative mb-5">
              <ListingCard
                description={item.Home?.description ?? ""}
                location={item.Home?.country ?? ""}
                homeId={item.Home?.id ?? ""}
                imagePath={item.Home?.photo ?? ""}
                price={item.Home?.price ?? 0}
                userId={user.id}
                favoriteId={item.Home?.Favorite?.[0]?.id ?? ""}
                isInFavoriteList={
                  (item.Home?.Favorite && item.Home.Favorite.length > 0) ?? false
                }
                pathName="/bookings"
              />
              {/* Display total price and booking dates */}
              <div className="mt-2 text-lg font-medium text-gray-800">
                <p>Total Price: ${item.totalPrice}</p>
                <p>Dates: {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}</p>
              </div>
              <CancelBookingButton bookingId={item.id} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
