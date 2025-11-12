"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ImageU from "./ImageU";

type User = {
  id: string;
  displayName: string | null;
  username: string;
  img: string | null;
};

export default function Recommendations() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/recommendations");
        const data = (await res.json()) as User[];
        setUsers(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="p-4 rounded-2xl border border-borderGray bg-[#161616]">
        <p className="text-textGray">Loading…</p>
      </div>
    );
  }

  if (!users.length) return null;

  return (
    <div className="p-4 rounded-2xl border border-borderGray bg-[#161616] flex flex-col gap-4">
      <h3 className="text-xl font-bold">Who to follow</h3>

      {users.map((u) => (
        <div key={u.id} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative rounded-full overflow-hidden w-10 h-10">
              <ImageU
                path={u.img || "general/noAvatar.png"}
                alt={u.username}
                w={100}
                h={100}
                tr={true}
              />
            </div>
            <div>
              <h1 className="text-md font-bold">
                {u.displayName ?? u.username}
              </h1>
              <span className="text-textGray text-sm">@{u.username}</span>
            </div>
          </div>

          <button className="py-1 px-4 font-semibold bg-white text-black rounded-full text-sm">
            Follow
          </button>
        </div>
      ))}

      <Link href="/explore/people" className="text-iconBlue hover:underline">
        Show More
      </Link>
    </div>
  );
}