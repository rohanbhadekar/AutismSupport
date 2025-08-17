import React from "react";
import { useAuth } from "@clerk/clerk-react";

export default function CallApi() {
  const { getToken } = useAuth();

  const hitApi = async () => {
    const token = await getToken(); // default = 'session' token
    alert(`Token: ${token}`);
    const res = await fetch("http://localhost:4000/api/protected", {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert(await res.text());
  };

  return <button onClick={hitApi}>Call Protected API</button>;
}
