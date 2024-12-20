import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../../../lib/db";
import { UpdateListingForm } from "../../../components/UpdateListingForm";

interface Props {
  params: { homeId: string };
}

export default async function EditListingPage({ params }: Props) {
  const session = await getKindeServerSession();
  const user = await session.getUser();

  if (!user) {
    return redirect("/");
  }

  const listing = await prisma.home.findUnique({
    where: { id: params.homeId },
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
    },
  });
  
  if (!listing) {
    return <p>Listing not found.</p>;
  }
  
  return (
    <UpdateListingForm
      listing={{
        id: listing.id,
        title: listing.title || "", 
        description: listing.description || "", 
        price: listing.price ?? 0, 
      }}
      userId={user.id}
    />
  );
}  