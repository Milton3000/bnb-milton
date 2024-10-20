"use server"

import { redirect } from "next/navigation";
import prisma from "./lib/db"

// Server environment "use server"
// File for the server actions, from Next.Js 13.4


// Check for existing homes etc. 
export async function createHome({ userId }: { userId: string }) {
    const data = await prisma.home.findFirst({
        where: {
            userId: userId
        },
        orderBy: {
            createdAt: "desc",
        }
    });

    // If the data has zero homes in the db, then create a new home.
    if (data === null) {
        const data = await prisma.home.create({
            data: {
                userId: userId,
            },
        });
        return redirect(`/create/${data.id}/structure`);
    } else if (!data.addedCategory && !data.addedDescription && !data.addedLocation) {
        return redirect(`/create/${data.id}/structure`);
    } else if (data.addedCategory && !data.addedDescription) {
        return redirect(`/create/${data.id}/description`);
    }
}


export async function createCategoryPage(formData: FormData) {


    const categoryName = formData.get("categoryName") as string;
    const homeId = formData.get("homeId") as string;

    const data = await prisma.home.update({
        where: {
            id: homeId,
        },
        data: {
            categoryName: categoryName,
            addedCategory: true,
        },
    });

    return redirect(`/create/${homeId}/description`);
}