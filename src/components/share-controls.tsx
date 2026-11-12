"use client";
import { Check, Copy, Share2 } from "lucide-react";
import { useState } from "react";
export function ShareControls({ title }: { title: string }) {
  const [status, setStatus] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(location.href);
      setStatus("Link copied.");
    } catch {
      setStatus("Copy this page’s address from your browser to share it.");
    }
  }
  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: location.href });
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError"))
          await copy();
      }
    } else await copy();
  }
  return (
    <div className="share-controls">
      <span>Pass the idea on</span>
      <button type="button" onClick={copy}>
        {status === "Link copied." ? <Check size={15} /> : <Copy size={15} />}
        Copy link
      </button>
      <button type="button" onClick={share}>
        <Share2 size={15} />
        Share
      </button>
      <span role="status" className="share-status">
        {status}
      </span>
    </div>
  );
}
