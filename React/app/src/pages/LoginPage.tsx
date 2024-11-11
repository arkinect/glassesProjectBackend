// imports
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// prop interface
interface props {}

// class
const LoginPage: React.FC<props> = () => {
  const { handleRedirectCallback, isAuthenticated, error, isLoading, user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const processAuth = async () => {
      try {
        await handleRedirectCallback();
        navigate("/market");
      } catch (error) {
        console.error("Error handling redirect callback:", error);
      }
    };

    // Only process the authentication if it's not loading
    if (!isLoading) {
      processAuth();
    }
}, [handleRedirectCallback, isLoading, navigate]);

  // Display loading message while the page is loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If there is an error, display the error message
  if (error) {
    return <div>Error processing the login callback: {error.message}</div>;
  }

  // If the user is authenticated, redirect them to the /market page
  if (isAuthenticated && user) {
    navigate("/market");
    return <div>Authenticated, redirecting...</div>;
  }

  return <div>Authentication in progress... Please wait.</div>;
};

export default LoginPage;
