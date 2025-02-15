import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const { isSignedIn, user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/dashboard"); // Redirect after login
    }
  }, [isSignedIn, navigate]);

  if (!isLoaded) {
    return <p className="text-gray-500">Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {isSignedIn ? (
        <>
          <p>Welcome, {user?.fullName || "User"}</p>
          <button onClick={() => navigate("/dashboard")} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
            Go to Dashboard
          </button>
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
