// DebugToken.jsx
import { useAuth } from "@clerk/clerk-react";

export default function CallApi() {
  const { getToken } = useAuth();
  const rawBase = process.env.REACT_APP_API_BASE_URL?.trim();

  // Fallback ONLY for local dev; prod should always have the env var set
  const baseUrl = rawBase || "https://<your-correct-service>.up.railway.app";

  const hitApi = async () => {
    try {
      const token = await getToken();
      console.log("Using API base:", baseUrl);

      const url = new URL("/api/protected", baseUrl).toString();

      const res = await fetch(url, {
        method: "POST",     // match your backend
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ping: true }),
      });

      const text = await res.text();
      const isJson = res.headers.get("content-type")?.includes("application/json");
      console.log("Status:", res.status, "Body:", text);
      alert(isJson ? JSON.stringify(JSON.parse(text), null, 2) : text);
    } catch (err) {
      console.error("Fetch failed:", err);
      alert(`Fetch error: ${err?.message || err}`);
    }
  };

  return <button onClick={hitApi}>Call Protected</button>;
}
