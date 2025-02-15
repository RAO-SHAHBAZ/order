import { UserButton } from "@clerk/clerk-react";

export default function Header() {
  return (
    <header className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg mb-6">
      <h1 className="text-xl font-semibold">Order Management</h1>
      <UserButton />
    </header>
  );
}
