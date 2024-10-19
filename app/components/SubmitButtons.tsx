"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
// If we use State in any form, we have to mark it as "use client" with Next.js
import { useFormStatus } from "react-dom"


export function SubmitButton() {
    const { pending } = useFormStatus()
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
    )
}