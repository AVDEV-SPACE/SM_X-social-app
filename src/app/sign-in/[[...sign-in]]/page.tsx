"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      {/* Container principal – full width, centrat */}
      <div className="w-full max-w-md lg:max-w-lg space-y-8">
        {/* Logo X pe mobil */}
        <div className="flex justify-center lg:hidden">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="white" className="mb-8">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>

        <div className="space-y-6">
          <h1 className="text-5xl font-bold">Happening now</h1>
          <h2 className="text-xl">Join today.</h2>

          <SignIn.Root>
            <div className="clerk-captcha"></div>

            <Clerk.Connection
              name="google"
              className="bg-white text-black rounded-full py-3 px-6 w-full flex items-center justify-center gap-3 font-bold hover:bg-gray-100 transition"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 6.75c1.63 0 3.06.56 4.21 1.65l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign in with Google
            </Clerk.Connection>

            <Clerk.Connection
              name="apple"
              className="bg-white text-black rounded-full py-3 px-6 w-full flex items-center justify-center gap-3 font-bold hover:bg-gray-100 transition"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.56 2.34-2.55 3.96-2.57 1.62-.02 2.63.9 3.68 1.66.93-.73 2.38-1.59 3.74-1.52 1.7.03 3.1 1.32 3.96 2.57-3.01 1.85-2.25 5.4.05 7.12-.67 1.42-1.54 2.85-2.38 4.04zm-2.57-13.5c-.83-.44-1.89-.68-2.91-.68-1.78 0-3.2.85-4.1 2.15 1.5.9 2.5 2.4 2.5 4.1 0 1.9-1.1 3.5-2.6 4.1.9 1.3 2.3 2.15 4.1 2.15 1.02 0 2.08-.34 2.91-.78-.5-1.5-.8-3.1-.8-4.7 0-1.6.3-3.1.8-4.7z" />
              </svg>
              Sign in with Apple
            </Clerk.Connection>

            <div className="my-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-black px-2 text-gray-400">or</span>
              </div>
            </div>

            <SignIn.Step name="start">
              <Clerk.Field name="identifier">
                <Clerk.Input
                  placeholder="Email address"
                  className="bg-[#161616] text-white placeholder:text-gray-500 py-3 px-6 rounded-full w-full border border-gray-700 focus:border-white focus:outline-none transition"
                />
                <Clerk.FieldError className="text-red-400 text-sm mt-1" />
              </Clerk.Field>
              <SignIn.Action
                submit
                className="mt-3 bg-white text-black rounded-full py-3 w-full font-bold hover:bg-gray-100 transition"
              >
                Continue
              </SignIn.Action>
            </SignIn.Step>

            <Link
              href="/sign-up"
              className="block mt-6 bg-[#1D9BF0] text-white rounded-full py-3 w-full text-center font-bold hover:bg-[#1a8cd8] transition"
            >
              Create account
            </Link>

            <p className="text-xs text-gray-400 mt-6">
              By signing up, you agree to the{" "}
              <span className="text-[#1D9BF0] hover:underline">Terms of Service</span> and{" "}
              <span className="text-[#1D9BF0] hover:underline">Privacy Policy</span>, including{" "}
              <span className="text-[#1D9BF0] hover:underline">Cookie Use</span>.
            </p>
          </SignIn.Root>
        </div>
      </div>

      {/* Logo X mare pe desktop – dreapta */}
      <div className="hidden lg:flex items-center justify-center flex-1 ml-16">
        <svg width="400" height="400" viewBox="0 0 24 24" fill="white">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>
    </div>
  );
}