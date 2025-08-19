// src/pages/QaListPage.jsx
import React, { useEffect, useState } from "react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { useQaApi } from "../api/qaApi";
import QaQuestionCard from "../components/QaQuestionCard";
import { useUser } from "@clerk/clerk-react";




export default function QaListPage() {
  const api = useQaApi();
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  async function load() {
    setLoading(true);
    try {
      const rows = await api.listQuestions({ q, tag, sort: "new", limit: 20 });
      setItems(rows);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  async function handleVote(id, value) {
    try {
      const r = await api.voteQuestion(id, value);
      setItems((prev) => prev.map((it) => (it.id === id ? { ...it, votes_count: r.votes_count } : it)));
    } catch (e) {
      alert(e.message);
    }
  }

  async function handleAsk(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const fd = new FormData(form);

  const title = fd.get("title")?.trim();
  const body = fd.get("body")?.trim();
  const tags =
    fd.get("tags")?.split(",").map((s) => s.trim()).filter(Boolean) || [];

  if (!title || !body) return alert("Title and Body required");

  try {

     const qn = await api.askQuestion({
      title,
      body,
      tags,
      asked_by: user?.firstName || user?.username || user?.primaryEmailAddress?.emailAddress || "Anonymous", // ✅ send name/email
    });

    setItems((prev) => [qn, ...prev]);
    form.reset();
  } catch (e2) {
    alert(e2.message);
  }
}

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row sm:items-end gap-2 mb-4">
        <div className="flex-1">
          <label className="text-sm text-gray-600">Search</label>
          <input value={q} onChange={(e) => setQ(e.target.value)} className="w-full border p-2 rounded" placeholder="keywords…" />
        </div>
        <div>
          <label className="text-sm text-gray-600">Tag</label>
          <input value={tag} onChange={(e) => setTag(e.target.value)} className="w-full border p-2 rounded" placeholder="e.g. speech-therapy" />
        </div>
        <button onClick={load} className="h-10 px-4 bg-blue-600 text-white rounded">Search</button>
      </div>

      <div className="mb-6 border rounded-lg p-4 bg-[#fbfaf7]">
        <h2 className="text-lg font-semibold mb-2">Ask a question</h2>
        <SignedOut>
          <p className="text-sm">Please <SignInButton mode="modal">sign in</SignInButton> to ask.</p>
        </SignedOut>
        <SignedIn>
          <form onSubmit={handleAsk} className="grid gap-2">
            <input name="title" className="border p-2 rounded" placeholder="Short title" />
            <textarea name="body" rows="4" className="border p-2 rounded" placeholder="Describe your problem clearly…" />
            <input name="tags" className="border p-2 rounded" placeholder="comma,separated,tags (optional)" />
            <button className="self-start bg-green-600 text-white px-4 py-2 rounded">Post Question</button>
          </form>
        </SignedIn>
      </div>

      {loading ? <div>Loading…</div> : (
        <div className="grid gap-3">
          {items.map((q) => (
            <QaQuestionCard key={q.id} q={q} onVote={handleVote} />
          ))}
          {!items.length && <div className="text-gray-500">No questions yet.</div>}
        </div>
      )}
    </div>
  );
}
