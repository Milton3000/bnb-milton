import React from "react";
import { LoginForm } from "@/app/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}
