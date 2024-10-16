"use client"

import { Card, CardHeader } from "@/components/ui/card"
import { categoryItems } from "../lib/categoryItems"
import Image from "next/image";

export function SelectedCategory() {
    return (
        <div>
            {categoryItems.map((item) => (
                <div key={item.id} className="cursor-pointer">
                    <Card>
                    <CardHeader>
                        <Image 
                        src={item.imageUrl}
                        alt={item.name}
                        height={32}
                        width={32}
                        className="w-8 h-8"
                        />

                    </CardHeader>
                    </Card>
                </div>
            ))}
        </div>
    );
}