import { SignInButton, SignUpButton } from "@clerk/clerk-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h1>
      <p className="mb-6">Please log in or sign up to continue.</p>
      <div className="space-x-4">
        <SignInButton>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Login</button>
        </SignInButton>
        <SignUpButton>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg">Sign Up</button>
        </SignUpButton>
      </div>
    </div>
  );
}
