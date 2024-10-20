import { Counter } from "@/app/components/Counter";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function DescriptionPage() {
    return (
        <>
            <div className="w-3/5 mx-auto">
                <h2 className="text-3xl font-semibold tracking-tight transition-colors">
                    Please describe your home
                </h2>
            </div>

            <form>
                <div className="mx-auto w-3/5 mt-10 flex flex-col gap-y-5 mb-36">
                    <div className="flex flex-col gap-y-2">
                        <Label>Title</Label>
                        <Input name="title" type="text" required placeholder="Short and simple..." />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label>Description</Label>
                        <Textarea name="description" required placeholder="Describe your home" />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label> Price </Label>
                        <Input name="price" type="number" required placeholder="Price per night" min={10} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label> Image </Label>
                        <Input name="image" type="file" required placeholder="Upload an image" />
                    </div>

                    <Card>
                        <CardHeader className="flex flex-col gap-y-5">
                        <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <h3 className="underline font-medium">Guests</h3>
                            <p className="text-muted-foreground text-sm"> How many guests?</p>
                        </div>
                        <Counter />
                        </div>
                        </CardHeader>
                    </Card>
                </div>
            </form>

        </>
    )
}