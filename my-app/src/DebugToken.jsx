import React from "react";
import { useAuth } from "@clerk/clerk-react";

export default function CallApi() {
  const { getToken } = useAuth();
  const baseUrl =
    process.env.REACT_APP_API_BASE_URL ??
    "https://parentingautismtogether.up.railway.app";

  const hitApi = async () => {
    const token = await getToken(); // default = 'session' token
    alert(`Token: ${token}`);
    console.log(`Token: ${token}`);
    const res = await fetch(`${baseUrl}/api/protected`, {
      method: "POST", // <— if your server expects POST
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ping: true }),
    });

    const text = await res.text(); // show full server reply for debugging
    console.log(`Response: ${text}`);
    if (res.headers.get("content-type")?.includes("application/json")) {
      console.log(`Response: ${text}`);
    }
  };

  return <button onClick={hitApi}>Call Protected API</button>;
}
