"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { addPost } from "@/actions"; 

const PostModal = () => {
  const router = useRouter();
  const { user } = useUser();
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(addPost, {
    success: false,
    error: false,
  });

  // Reset la succes
  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      router.push("/");
    }
  }, [state, router]);

  return (
    <div className="absolute w-screen h-screen top-0 left-0 z-20 bg-[#293139a6] flex justify-center">
      <form
        ref={formRef}
        action={formAction}
        className="py-4 px-8 rounded-xl bg-black w-[600px] h-max mt-12 flex flex-col gap-6"
      >
        {/* TOP */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="cursor-pointer text-white text-2xl hover:bg-[#181818] rounded-full w-10 h-10 flex items-center justify-center"
          >
            ×
          </button>
          <div className="text-iconBlue font-bold">Drafts</div>
        </div>

        {/* CENTER */}
        <div className="flex gap-4">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={user?.imageUrl || "/general/avatar.png"}
              alt="user"
              width={40}
              height={40}
              className="object-cover"
              unoptimized
            />
          </div>
          <input
            name="desc"
            placeholder="What is happening?!"
            className="flex-1 bg-transparent outline-none text-lg text-white placeholder-gray-500"
            autoFocus
            required
          />
        </div>

        {/* BOTTOM */}
        <div className="flex items-center justify-between gap-4 flex-wrap border-t border-borderGray pt-4">
          <div className="flex gap-4 flex-wrap">
            {["image", "gif", "poll", "emoji", "schedule", "location"].map((icon) => (
              <label key={icon} className="cursor-pointer">
                <Image src={`/icons/${icon}.svg`} alt={icon} width={20} height={20} />
              </label>
            ))}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="py-2 px-5 bg-white text-black rounded-full font-bold disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? "Posting..." : "Post"}
          </button>
        </div>

        {state.error && (
          <p className="text-red-400 text-center">Eroare! Încearcă din nou.</p>
        )}
      </form>
    </div>
  );
};

export default PostModal;