import Image from "next/image";

interface iAppProps {
  imagePath: string;
  description: string;
  location: string;
  price: number;
}

export function ListingCard({
  description,
  imagePath,
  location,
  price,
}: iAppProps) {

console.log(imagePath)
  return (
    <div className="flex flex-col">
      <div className="relative h-72">
        <Image
          src={`https://sctnymoriaxapkrjnbfc.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt="Image of Property"
          fill
          className="rounded-lg height-full object-cover mb-3"
        />
      </div>
    </div>
  );
}
