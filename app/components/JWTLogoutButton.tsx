"use client";

import React from "react";
import { useRouter } from "next/navigation";

export function JWTLogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/custom-auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.refresh();
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button onClick={handleLogout} className="w-full text-start">
      Logout
    </button>
  );
}
