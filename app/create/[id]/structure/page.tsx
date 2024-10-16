import { SelectedCategory } from "@/app/components/SelectedCategory";
import { Button } from "@/components/ui/button";

export default function StructureRoute() {
    return (
<>
<div className="w-3/5 mx-auto">

<h2 className="text-3xl font-semibold tracking-tight transition-colors">
    Which of these best describe your Home? 
</h2>
</div>

<form>
    <SelectedCategory />

    <div className="fixed w-full bottom-0 z-10 bg-white border-t h-24">
<div className="flex items-center justify-between mx-auto px-5 lg:px-10 h-full">
<Button>
    Cancel
</Button>
</div>
    </div>
</form>
</>
    )
}