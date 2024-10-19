"use client";
import { Button } from "@/components/ui/button";
// If we use State in any form, we have to mark it as "use client" with Next.js
import { useFormStatus } from "react-dom"


export function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <>
            {pending ? (
                <Button type="submit" size="lg">Next</Button>
            ) : (
                <Button type="submit" size="lg">Next</Button>
            )}
        </>
    )
}