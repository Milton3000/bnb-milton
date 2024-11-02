import { Dialog, DialogTrigger } from "@/components/ui/dialog";

export function SearchModalComponent() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="rounded-full py-2 px-5 border flex items-center cursor-pointer">
          <div className="flex h-full divide-x font-medium">
            <p className="px-4">Anywhere</p>
            <p className="px-4">Any Week</p>
            <p className="px-4">Add Guests</p>
          </div>
        </div>
      </DialogTrigger>
    </Dialog>
  );
}
