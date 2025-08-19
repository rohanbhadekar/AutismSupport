import React from "react";
import { useAuth } from "@clerk/clerk-react";

export default function CallApi() {
  const { getToken } = useAuth();

  const hitApi = async () => {
    const token = await getToken(); // default = 'session' token
    alert(`Token: ${token}`);
    console.log(`Token: ${token}`);
    const res = await fetch("https://parentingautismtogether.up.railway.app/api/protected", {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert(await res.text());
  };

  return <button onClick={hitApi}>Call Protected API</button>;
}
