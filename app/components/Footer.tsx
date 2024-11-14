// components/Footer.jsx

import Image from "next/image";
import Link from "next/link";
import DreamBnBTrans from "../../public/DreamBnBTrans.png";

export function Footer() {
  return (
    <footer className="w-full bg-gray-50 border-t py-6">
      <div className="container mx-auto px-5 lg:px-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <Image
              src={DreamBnBTrans}
              alt="DreamBnB Logo"
              className="w-32 hidden lg:block"
            />
          </Link>

          {/* Footer Links */}
          <div className="flex flex-wrap justify-center space-x-4 text-gray-600 text-sm">
            <Link href="/footer/about">About</Link>
            <Link href="/footer/terms">Terms of Service</Link>
            <Link href="/footer/privacy">Privacy Policy</Link>
            <Link href="/footer/contact">Contact Us</Link>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-center text-gray-500 text-xs mt-4">
          &copy; {new Date().getFullYear()} DreamBnB. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
