import Image from "next/image";
import Link from "next/link";
import DreamBnBTrans from "../../../public/DreamBnBTrans.png";

export default function AboutPage() {
  return (
    <div className="container max-w-screen-md mx-auto px-5 lg:px-10 py-10 text-center">
      {/* Logo */}
      <Image src={DreamBnBTrans} alt="DreamBnB Logo" width={150} height={150} className="mx-auto mb-4" />

      {/* About Us Content */}
      <h1 className="text-3xl font-semibold mb-4">About Us</h1>
      <p className="mb-4 text-lg">
        DreamBnB is a platform dedicated to connecting travelers with unique and unforgettable stays across the globe. Whether you are looking for a quiet countryside retreat or a bustling city apartment, DreamBnB helps you find a place that feels like home.
      </p>
      <p className="text-lg font-semibold italic mb-4">Where dreams come Home</p>
      <p className="mb-4 text-lg">Founded by Milton Kristoffersson, 2024</p>

      {/* Contact Information */}
      <p className="text-lg">
        For inquiries, please <Link href="/footer/contact" className="text-blue-600 underline">contact us here</Link>.
      </p>
    </div>
  );
}
