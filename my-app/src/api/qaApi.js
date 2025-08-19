import { useAuth } from "@clerk/clerk-react";

export function useQaApi() {
  const { getToken } = useAuth();
  const base = process.env.REACT_APP_API_BASE_URL || "https://parentingautismtogether.up.railway.app";

  async function req(path, { method = "GET", body, auth = false } = {}) {
    const headers = { "Content-Type": "application/json" };

    if (auth) {
      const token = await getToken();
      if (!token) throw new Error("No token found. User might not be logged in.");
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${base}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API ${res.status}: ${text}`);
    }

    return res.json();
  }

  // ---------- Questions ----------
  const listQuestions = (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return req(`/api/qa/questions${qs ? `?${qs}` : ""}`, { auth: true }); // ✅ token added
  };

  const getQuestion = (id) => req(`/api/qa/questions/${id}`, { auth: true }); // optional auth
  const askQuestion = (payload) => req(`/api/qa/questions`, { method: "POST", body: payload, auth: true });
  const voteQuestion = (id, value) => req(`/api/qa/questions/${id}/vote`, { method: "POST", body: { value }, auth: true });
  const acceptAnswer = (qid, aid) => req(`/api/qa/questions/${qid}/accept/${aid}`, { method: "POST", auth: true });

  // ---------- Answers ----------
  const addAnswer = (qid, payload) => req(`/api/qa/questions/${qid}/answers`, { method: "POST", body: payload, auth: true });
  const voteAnswer = (aid, value) => req(`/api/qa/answers/${aid}/vote`, { method: "POST", body: { value }, auth: true });

  return {
    listQuestions,
    getQuestion,
    askQuestion,
    voteQuestion,
    addAnswer,
    voteAnswer,
    acceptAnswer
  };
}
