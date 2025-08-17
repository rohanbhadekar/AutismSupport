// src/pages/QuestionDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import { useQaApi } from "../api/qaApi";

export default function QuestionDetailPage() {
  const { id } = useParams();
  const api = useQaApi();
  const { user } = useUser();
  const [data, setData] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    api.getQuestion(id).then(setData).catch((e) => alert(e.message));
    // eslint-disable-next-line
  }, [id, refreshKey]);

  async function voteQ(value) {
    try {
      const r = await api.voteQuestion(id, value);
      setData((d) => ({ ...d, question: { ...d.question, votes_count: r.votes_count } }));
    } catch (e) {
      alert(e.message);
    }
  }

  async function voteA(aid, value) {
    try {
      const r = await api.voteAnswer(aid, value);
      setData((d) => ({
        ...d,
        answers: d.answers.map((a) => (a.id === aid ? { ...a, votes_count: r.votes_count } : a)),
      }));
    } catch (e) {
      alert(e.message);
    }
  }

  async function submitAnswer(e) {
    e.preventDefault();
   const form = e.currentTarget;          
   const body = form.body.value.trim();
    if (!body) return;
    try {
      await api.addAnswer(id, { body });
     form.reset();
      setRefreshKey((k) => k + 1);
    } catch (e2) {
      alert(e2.message);
    }
  }

  async function acceptAnswer(aid) {
    try {
      await api.acceptAnswer(id, aid);
      setRefreshKey((k) => k + 1);
    } catch (e) {
      alert(e.message);
    }
  }

  if (!data) return <div className="max-w-4xl mx-auto p-4">Loading…</div>;
  const { question, answers } = data;
  const isOwner = user?.id && question?.author_clerk_id === user.id;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Question header */}
      <div className="border rounded-lg p-4 bg-white shadow-sm">
        <div className="flex gap-4">
          <div className="w-16 text-center">
            <div className="font-bold text-lg">{question.votes_count}</div>
            <div className="text-xs text-gray-500">votes</div>
            <div className="mt-2 flex flex-col gap-1">
              <SignedIn>
                <button className="border px-1 rounded" onClick={() => voteQ(1)}>
                  ▲
                </button>
                <button className="border px-1 rounded" onClick={() => voteQ(-1)}>
                  ▼
                </button>
              </SignedIn>
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-semibold">{question.title}</h1>
            <p className="mt-2 text-gray-800 whitespace-pre-wrap">{question.body}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(question.tags || []).map((t) => (
                <span
                  key={t}
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-2 text-xs text-gray-500">
              asked {new Date(question.created_at).toLocaleString()} by{" "}
              {question?.author?.display_name || "Anonymous"}
            </div>
          </div>
        </div>
      </div>

      {/* Answers */}
      <h2 className="mt-6 mb-2 font-semibold">{answers.length} Answers</h2>
      <div className="grid gap-3">
        {answers.map((a) => (
          <div
            key={a.id}
            className={`border rounded-lg p-4 bg-white shadow-sm ${
              a.is_accepted ? "ring-2 ring-green-400" : ""
            }`}
          >
            <div className="flex gap-4">
              <div className="w-16 text-center">
                <div className="font-bold">{a.votes_count}</div>
                <div className="text-xs text-gray-500">votes</div>
                <SignedIn>
                  <div className="mt-2 flex flex-col gap-1">
                    <button
                      className="border px-1 rounded"
                      onClick={() => voteA(a.id, 1)}
                    >
                      ▲
                    </button>
                    <button
                      className="border px-1 rounded"
                      onClick={() => voteA(a.id, -1)}
                    >
                      ▼
                    </button>
                  </div>
                </SignedIn>
              </div>

              <div className="flex-1">
                <div className="whitespace-pre-wrap">{a.body}</div>
                <div className="mt-2 text-xs text-gray-500">
                  answered {new Date(a.created_at).toLocaleString()} by{" "}
                  {a?.author?.display_name || "Anonymous"}
                </div>

                <div className="mt-3 flex items-center gap-3">
                  {a.is_accepted && (
                    <span className="inline-flex items-center gap-1 text-green-700 text-sm font-medium">
                      ✅ Accepted answer
                    </span>
                  )}

                  {isOwner && !a.is_accepted && (
                    <button
                      className="text-sm px-3 py-1 rounded border border-green-600 text-green-700 hover:bg-green-50"
                      onClick={() => acceptAnswer(a.id)}
                      title="Mark as accepted"
                    >
                      Accept
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        {!answers.length && (
          <div className="text-gray-500">No answers yet. Be the first!</div>
        )}
      </div>

      {/* Add answer */}
      <div className="mt-8 border rounded-lg p-4 bg-[#fbfaf7]">
        <h3 className="font-semibold mb-2">Your Answer</h3>
        <SignedOut>
          <p className="text-sm">
            Please <SignInButton mode="modal">sign in</SignInButton> to post an
            answer.
          </p>
        </SignedOut>
        <SignedIn>
          <form onSubmit={submitAnswer} className="grid gap-2">
            <textarea
              name="body"
              rows="5"
              className="border p-2 rounded"
              placeholder="Write a clear, supportive answer (steps, examples, links)…"
            />
            <button className="self-start bg-blue-600 text-white px-4 py-2 rounded">
              Post Answer
            </button>
          </form>
        </SignedIn>
      </div>
    </div>
  );
}
