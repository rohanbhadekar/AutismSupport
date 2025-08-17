// src/components/QaQuestionCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function QaQuestionCard({ q, onVote }) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm flex gap-4">
      <div className="w-16 text-center">
        <div className="font-bold">{q.votes_count}</div>
        <div className="text-xs text-gray-500">votes</div>
        <div className="font-bold mt-2">{q.answers_count}</div>
        <div className="text-xs text-gray-500">answers</div>
        {onVote && (
          <div className="mt-3 flex flex-col gap-1">
            <button className="border px-1 rounded" onClick={() => onVote(q.id, 1)}>▲</button>
            <button className="border px-1 rounded" onClick={() => onVote(q.id, -1)}>▼</button>
          </div>
        )}
      </div>
      <div className="flex-1">
        <Link to={`/qa/${q.id}`} className="text-lg font-semibold text-blue-700">
          {q.title}
        </Link>
        <p className="mt-1 text-gray-700 line-clamp-3">{q.body}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {(q.tags || []).map((t) => (
            <span key={t} className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{t}</span>
          ))}
        </div>
        <div className="mt-2 text-xs text-gray-500">
            Asked {new Date(q.created_at).toLocaleString()} by {q.asked_by || "Anonymous"}
              Asked {new Date(q.created_at).toLocaleString()} by{" "}
              {q?.author?.display_name || "Anonymous"}
        </div>
      </div>
    </div>
  );
}
