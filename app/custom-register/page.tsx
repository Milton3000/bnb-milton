import { RegisterForm } from "@/app/components/RegisterForm";
import React from "react";


export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Register</h1>
        <RegisterForm />
      </div>
    </div>
  );
}
