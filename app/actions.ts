/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { supabase } from "./lib/supabase";
import { revalidatePath } from "next/cache";
import { differenceInDays } from "date-fns";

// Base URL for redirecting in production
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// Check for existing homes and create if none exists.
export async function createHome({ userId }: { userId: string }) {
  const data = await prisma.home.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // If no home exists, create a new one.
  if (data === null) {
    const newHome = await prisma.home.create({
      data: { userId: userId },
    });
    return redirect(`${baseUrl}/create/${newHome.id}/structure`);
  } else if (!data.addedCategory && !data.addedDescription && !data.addedLocation) {
    return redirect(`${baseUrl}/create/${data.id}/structure`);
  } else if (data.addedCategory && !data.addedDescription) {
    return redirect(`${baseUrl}/create/${data.id}/description`);
  } else if (data.addedCategory && data.addedDescription && !data.addedLocation) {
    return redirect(`${baseUrl}/create/${data.id}/address`);
  } else if (data.addedCategory && data.addedDescription && data.addedLocation) {
    const newHome = await prisma.home.create({
      data: { userId: userId },
    });
    return redirect(`${baseUrl}/create/${newHome.id}/structure`);
  }
}

export async function createCategoryPage(formData: FormData) {
  const categoryName = formData.get("categoryName") as string;
  const homeId = formData.get("homeId") as string;

  const data = await prisma.home.update({
    where: { id: homeId },
    data: { categoryName: categoryName, addedCategory: true },
  });

  return redirect(`${baseUrl}/create/${homeId}/description`);
}

export async function createDescriptionPage(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price");
  const image = formData.get("image") as File;
  const homeId = formData.get("homeId") as string;

  const guestNumber = formData.get("guests") as string;
  const roomNumber = formData.get("room") as string;
  const bathroomNumber = formData.get("bathroom") as string;

  const { data: imageData } = await supabase.storage
    .from("images")
    .upload(`${image.name}-${new Date()}`, image, {
      cacheControl: "2592000",
      contentType: "image/png",
    });

  const data = await prisma.home.update({
    where: { id: homeId },
    data: {
      title: title,
      description: description,
      price: Number(price),
      bedrooms: roomNumber,
      bathrooms: bathroomNumber,
      guests: guestNumber,
      photo: imageData?.path,
      addedDescription: true,
    },
  });

  return redirect(`${baseUrl}/create/${homeId}/address`);
}

export async function createLocation(formData: FormData) {
  const homeId = formData.get("homeId") as string;
  const countryValue = formData.get("countryValue") as string;

  const data = await prisma.home.update({
    where: { id: homeId },
    data: { country: countryValue, addedLocation: true },
  });

  return redirect(baseUrl);
}


// Add to favorites
export async function addToFavorite(formData: FormData) {
  const homeId = formData.get("homeId") as string;
  const userId = formData.get("userId") as string;
  const pathName = formData.get("pathName") as string;

  const data = await prisma.favorite.create({
    data: {
      homeId: homeId,
      userId: userId,
    },
  });

  revalidatePath(pathName);
}

// Delete from favorites
export async function deleteFromFavorite(formData: FormData) {
  const favoriteId = formData.get("favoriteId") as string;
  const userId = formData.get("userId") as string;
  const pathName = formData.get("pathName") as string;

  const data = await prisma.favorite.delete({
    where: {
      id: favoriteId,
      userId: userId,
    },
  });

  revalidatePath(pathName);
}

// Create booking with totalPrice calculation
export async function createBooking(formData: FormData) {
  const userId = formData.get("userId") as string;
  if (!userId) {
    throw new Error("User must be logged in to create a booking.");
  }

  const homeId = formData.get("homeId") as string;
  const startDate = new Date(formData.get("startDate") as string);
  const endDate = new Date(formData.get("endDate") as string);

  // Fetch home to get price per night
  const home = await prisma.home.findUnique({
    where: { id: homeId },
    select: { price: true },
  });

  if (!home || !home.price) {
    throw new Error("Property not found or price is unavailable.");
  }

  const duration = differenceInDays(endDate, startDate);
  const totalPrice = home.price * duration;

  const booking = await prisma.booking.create({
    data: {
      userId,
      homeId,
      startDate,
      endDate,
      totalPrice,
      status: "pending",
    },
  });

  return redirect("/bookings");
}

// Update property (restricted to owner or admin)
interface UpdatePropertyData {
  title: string;
  description: string;
  price: number;
  image?: File | null; // Upload, optional
  photo?: string | null; // Existing photo path to delete if updated
}

// Update property (restricted to owner or admin)
export async function updateProperty(
  homeId: string,
  userId: string | undefined,
  data: UpdatePropertyData,
) {
  if (!userId) {
    throw new Error("User ID is required to update a property.");
  }

  const home = await prisma.home.findUnique({ where: { id: homeId } });

  if (!home) {
    throw new Error("Property not found.");
  }

  // Check if the user is the owner or an admin
  const isOwnerOrAdmin = home.userId === userId || (await isAdmin(userId));
  if (!isOwnerOrAdmin) {
    throw new Error("Not authorized to update this property.");
  }

  let newImagePath = data.photo; // Default to current image path if no new image is provided

  // If a new image is provided, delete the old one and upload the new one
  if (data.image) {
    // Delete the old image from Supabase if it exists ( NOT WORKING AT THE MOMENT )
    if (data.photo) {
      const { error: deleteError } = await supabase.storage.from("images").remove([data.photo]);
      if (deleteError) {
        console.error("Failed to delete old image:", deleteError);
      }
    }

    // Upload the new image to Supabase
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("images")
      .upload(`${data.image.name}-${Date.now()}`, data.image, {
        cacheControl: "2592000",
        contentType: data.image.type,
      });

    if (uploadError) {
      console.error("Failed to upload new image:", uploadError);
      throw uploadError;
    }

    newImagePath = uploadData?.path || undefined;
  }


  return prisma.home.update({
    where: { id: homeId },
    data: {
      title: data.title,
      description: data.description,
      price: data.price,
      photo: newImagePath,
    },
  });
}


// Delete property (restricted to owner or admin)
export async function deleteProperty(homeId: string, userId: string) {
  if (!homeId || !userId) {
    throw new Error("Home ID and User ID are required to delete a property.");
  }

  const home = await prisma.home.findUnique({
    where: { id: homeId },
    select: { userId: true },
  });

  if (!home) {
    throw new Error("Property not found.");
  }

  // Check if the user is the owner or an admin
  const isOwnerOrAdmin = home.userId === userId || (await isAdmin(userId));
  if (!isOwnerOrAdmin) {
    throw new Error("Not authorized to delete this property.");
  }

  await prisma.home.delete({
    where: { id: homeId },
  });
}


// Approve or reject booking (restricted to listing owner) -- SKIPPA DENNA, BEHÖVS INTE (2 VG krav)
export async function approveOrRejectBooking(
  bookingId: string,
  action: "accept" | "reject"
) {
  return await prisma.booking.update({
    where: { id: bookingId },
    data: {
      status: action === "accept" ? "accepted" : "rejected",
    },
  });
}

// IS USER ADMIN
export async function isAdmin(userId: string | undefined) {
  if (!userId) {
    throw new Error("User ID is required to check admin status.");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { isAdmin: true },
  });

  return user?.isAdmin ?? false;
}

// CANCEL BOOKING

export async function cancelBooking(bookingId: string) {
  if (!bookingId) throw new Error("Booking ID is required.");

  try {
    await prisma.booking.delete({
      where: { id: bookingId },
    });
  } catch (error) {
    console.error("Failed to cancel booking:", error);
    throw error;
  }
}
