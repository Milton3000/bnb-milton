import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { SearchIcon } from "lucide-react";

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
          <SearchIcon className="bg-primary text-white p-1 h-8 w-8 rounded-full"/>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
    <form className="gap-4 flex flex-col">
    
    </form>
      </DialogContent>
    </Dialog>
  );
}
