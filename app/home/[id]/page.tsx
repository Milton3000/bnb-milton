import prisma from "@/app/lib/db";
import { useCountries } from "@/app/lib/getCountries";
import DefaultUser from "../../../public/DefaultUser.png";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { CategoryShowcase } from "@/app/components/CategoryShowcase";
import { HomeMap } from "@/app/components/HomeMap";
import { SelectCalendar } from "@/app/components/SelectCalendar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createBooking } from "@/app/actions";
import { BookingSubmitButton } from "@/app/components/SubmitButtons";
import {unstable_noStore as noStore} from "next/cache";

async function getData(homeId: string) {
  noStore();
  const data = await prisma.home.findUnique({
    where: {
      id: homeId,
    },
    select: {
      photo: true,
      description: true,
      guests: true,
      bedrooms: true,
      bathrooms: true,
      title: true,
      categoryName: true,
      price: true,
      country: true,
      Booking: {
        where: {
          homeId: homeId,
        },
      },
      User: {
        select: {
          profileImage: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  return data;
}
// Just a static function for getdata, gotta invoke/call it below :)

export default async function HomeRoute({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(data?.country as string);
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="w-[75%] mx-auto mt-10 mb-12">
      <h1 className="font-medium text-2xl mb-5">{data?.title}</h1>
      <div className="relative h-[550px]">
        <Image
          className="rounded-lg h-full object-cover w-full"
          alt="Image of Home"
          src={`https://sctnymoriaxapkrjnbfc.supabase.co/storage/v1/object/public/images/${data?.photo}`}
          fill
          // Can use fill property instead of setting width + height, can only do that with a parent element which has a relative element.
        />
      </div>
      <div className="flex justify-between gap-x-24 mt-8">
        <div className="w-2/3">
          <h3 className="text-xl font-medium">
            {country?.flag} {country?.label} / {country?.region}
          </h3>
          <div className="flex gap-x-2 text-muted-foreground">
            <p> {data?.guests} Guests</p> - <p> {data?.bedrooms} Bedrooms</p> -{" "}
            <p> {data?.bathrooms} Bathrooms</p> -
          </div>

          <div className="flex items-center mt-6">
            <Image
              src={data?.User?.profileImage ?? DefaultUser}
              alt="Profile Image of User"
              width={65}
              height={65}
              className="w-15 h-15 rounded-full"
            />
            <div className="flex flex-col ml-4">
              <h3 className="font-medium">
                {data?.User?.firstName} {data?.User?.lastName}
              </h3>
              <p className="text-sm text-muted-foreground">Host since 2015</p>
            </div>
          </div>
          <Separator className="my-7" />
          <CategoryShowcase categoryName={data?.categoryName as string} />
          <Separator className="my-7" />
          <p className="text-muted-foreground">{data?.description}</p>
          <Separator className="my-7" />

          <HomeMap locationValue={country?.value as string} />
        </div>

        <form action={createBooking}>
          <input type="hidden" name="homeId" value={params.id} />
          <input type="hidden" name="userId" value={user?.id} />

          <SelectCalendar booking={data?.Booking} />
          {/* vill bara ha users som är authenticated göra en bokning  */}
          {user?.id ? (
            <BookingSubmitButton />
          ) : (
            <Button className="w-full" asChild>
              <Link href="/api/auth/login">Make a reservation</Link>
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
