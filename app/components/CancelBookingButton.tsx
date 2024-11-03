// components/CancelBookingButton.tsx

"use client"; // Mark as client component

import { cancelBooking } from "@/app/actions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface CancelBookingButtonProps {
  bookingId: string;
}

export default function CancelBookingButton({ bookingId }: CancelBookingButtonProps) {
  const router = useRouter();

  const handleCancelBooking = async () => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await cancelBooking(bookingId); // Directly call server action
      router.refresh();
    } catch (error) {
      console.error("Failed to cancel booking:", error);
    }
  };

  return (
    <Button variant="destructive" size="sm" onClick={handleCancelBooking} className="mt-3">
      Cancel Booking
    </Button>
  );
}
