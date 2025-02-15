import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export default function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <Routes>
          {/* Show Home Page When Not Logged In */}
          <Route
            path="/"
            element={
              <>
                <SignedOut>
                  <Home />
                </SignedOut>
                <SignedIn>
                  <Dashboard />
                </SignedIn>
              </>
            }
          />
        </Routes>
      </Router>
    </ClerkProvider>
  );
}
