import type { ReactNode } from "react";

export default function LayoutCreate({children}: {children: ReactNode}) {
    return (
        <div className="mt-10">
            {children}
        </div>
    )
}