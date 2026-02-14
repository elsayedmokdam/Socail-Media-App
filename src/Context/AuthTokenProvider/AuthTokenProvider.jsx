import axios from "axios";
import { createContext, useState } from "react";

export const AuthTokenContext = createContext();

export default function AuthTokenProvider({ children }) {
  // Lazy initialization
  const [userData, setUserData] = useState(() => {
    getUserData();
  });

  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null,
  );

  async function getUserData() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}users/profile-data`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );
      console.log(response);
      setUserData(response.data.user);
      return response.data.user;
    } catch (error) {
      setUserData(null);
      return null;
    }
  }

  return (
    // Send the shared data in the value props
    <AuthTokenContext.Provider value={{ userData, setUserData, getUserData }}>
      {children} {/* Render the app */}
    </AuthTokenContext.Provider>
  );
}
