import { SignInButton, SignUpButton } from "@clerk/clerk-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6 text-center">
      <h1 className="text-4xl font-extrabold text-gray-900 md:text-5xl">Welcome to Your Dashboard</h1>
      <p className="mt-4 text-lg text-gray-700">Please log in or sign up to continue.</p>

      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <SignInButton>
          <button className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition">
            Login
          </button>
        </SignInButton>

        <SignUpButton>
          <button className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 transition">
            Sign Up
          </button>
        </SignUpButton>
      </div>
    </div>
  );
}
