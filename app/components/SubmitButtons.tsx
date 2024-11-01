"use client";
import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";
// If we use State in any form, we have to mark it as "use client" with Next.js
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled size="lg">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button type="submit" size="lg">
          Next
        </Button>
      )}
    </>
  );
}

export function AddToFavoriteButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button variant="outline" size="icon" className="bg-secondary" disabled>
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        </Button>
      ) : (
        <Button
          variant="outline"
          size="icon"
          className="bg-secondary"
          type="submit"
        >
          <Heart className="w-4 h-4" />
        </Button>
      )}
    </>
  );
}

export function DeleteFromFavoriteButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button variant="outline" size="icon" className="bg-primary" disabled>
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        </Button>
      ) : (
        <Button
          variant="outline"
          size="icon"
          className="bg-primary"
          type="submit"
        >
          <Heart className="w-4 h-4 text-primary" fill="#E21C49" />
        </Button>
      )}
    </>
  );
}

export function BookingSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <>
    {pending ? (
      <Button className="w-full" disabled>
              <Loader2 className="w-4 h-4 animate-spin mr-2" /> 
              Booking ...
            </Button>
    ): (
      <Button className="w-full" type="submit">
              Book this home!
            </Button>
    )}
    </>
  )
}