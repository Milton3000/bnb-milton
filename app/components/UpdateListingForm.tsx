"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProperty } from "../actions";
import { Button } from "@/components/ui/button";

interface UpdateListingFormProps {
  listing: {
    id: string;
    title: string;
    description: string;
    price: number;
  };
  userId: string;
}

export function UpdateListingForm({ listing, userId }: UpdateListingFormProps) {
  const [title, setTitle] = useState(listing.title);
  const [description, setDescription] = useState(listing.description);
  const [price, setPrice] = useState(listing.price);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateProperty(listing.id, userId, { title, description, price });
      router.push("/my-listings"); // Redirect
    } catch (error) {
      console.error("Failed to update listing:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 border border-gray-200 rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Listing</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a title for your listing"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your listing"
            rows={4}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Price (USD)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Price per night"
            min={10}
            required
          />
        </div>

        <Button type="submit" variant="default" className="w-full">
          Update Listing
        </Button>
      </form>
    </div>
  );
}
