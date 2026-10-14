"use client";

import { signUp } from "@/app/actions/auth-actions";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const result = await signUp({
      email,
      password,
    });

    if (result?.status === "ok") {
      redirect("/signin");
    }

    if (result?.message) {
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold">회원가입</h1>
      <p className="text-gray-700">인프런에서 다양한 학습의 기회를 얻으세요</p>

      <form className="flex flex-col gap-2 min-w-75" onSubmit={handleSubmit}>
        <label htmlFor="email">이메일</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          placeholder="example@inflab.com"
          className="border-2 border-gray-400 rounded-sm p-2"
        />

        <label htmlFor="password">비밀번호</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="******"
          className="border-2 border-gray-400 rounded-sm p-2"
        />

        <label htmlFor="confirmPassword">비밀번호 확인</label>
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          name="confirmPassword"
          placeholder="******"
          className="border-2 border-gray-400 rounded-sm p-2"
        />

        <button className="bg-green-500 text-white font-bold cursor-pointer p-2 rounded-sm ">
          회원가입
        </button>
        <Link className="text-center" href="/signin">
          로그인
        </Link>
      </form>
    </div>
  );
}
