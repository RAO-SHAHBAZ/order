import { SignIn, SignUp, SignOutButton, useUser } from "@clerk/clerk-react";

export default function Auth() {
  const { isSignedIn, user } = useUser();

  return (
    <div className="flex flex-col items-center gap-4">
      {isSignedIn ? (
        <>
          <p>Welcome, {user?.fullName}</p>
          <SignOutButton />
        </>
      ) : (
        <>
          <SignIn />
          <SignUp />
        </>
      )}
    </div>
  );
}
