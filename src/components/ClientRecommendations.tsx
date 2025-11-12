"use client";

import dynamic from "next/dynamic";

const Recommendations = dynamic(() => import("./Recommendations"), {
  ssr: false,
  loading: () => (
    <div className="p-4 rounded-2xl border border-borderGray bg-[#161616]">
      <p className="text-textGray">Loading...</p>
    </div>
  ),
});

export default function ClientRecommendations() {
  return <Recommendations />;
}