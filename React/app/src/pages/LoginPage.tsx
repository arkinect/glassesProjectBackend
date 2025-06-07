import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {}

const LoginPage: React.FC<Props> = () => {

  const { handleRedirectCallback, isAuthenticated, error, isLoading, user } = useAuth0();
  const navigate = useNavigate();
  const [authProcessed, setAuthProcessed] = useState(false);

  // Continualy check if authorization is finished
  useEffect(() => {
    if (!authProcessed && !isLoading && !isAuthenticated) {
      handleRedirectCallback()
        .then(() => {
          // Once authentication is processed set processed to true to stop checking
          setAuthProcessed(true);
        })
        .catch((err) => {
          console.error("Error handling redirect callback:", err);
        });
    }
  }, [authProcessed, isLoading, isAuthenticated, handleRedirectCallback]);

  // When authetification is complete, nav to market
  useEffect(() => {
    if (isAuthenticated && user) {
      const sub = user.sub;
      fetch('http://localhost:8000/users/new/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id:sub})
      })
      .then(res => res.json())
      .then(data => console.log("Response:", data))
      .catch(err => console.error("Error:", err));
      navigate("/market");
    }
  }, [isAuthenticated, user, navigate]);

  // handle render while loading
  if (isLoading) {
    return <div className="font_loadingText">Loading...</div>;
  }

  if (error) {
    return <div className="font_loadingText">Error processing the login callback: {error.message}</div>;
  }

  return <div className="font_loadingText">Authentication in progress... Please wait.</div>;
};

export default LoginPage;
