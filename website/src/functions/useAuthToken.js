import { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';

const useAuthToken = () => {
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; 
      if (decodedToken.exp > currentTime) {
        setIsValidToken(true);
      } else {
        localStorage.removeItem("token"); // Token expiré, le supprimer
        setIsValidToken(false);
      }
    }
  }, []);

  return isValidToken;
};

export default useAuthToken;


