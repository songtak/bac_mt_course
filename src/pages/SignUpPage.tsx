import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { z } from "zod";

const usernameSchema = z
  .string()
  .regex(
    /^[a-z0-9_]{5,20}$/,
    "아이디는 영어 소문자, 숫자, _만 가능하며 5~20자여야 합니다."
  );

const passwordSchema = z
  .string()
  .min(5, "비밀번호는 최소 5자 이상이어야 합니다.")
  .max(20, "비밀번호는 최대 20자까지 가능합니다.");

const nicknameSchema = z
  .string()
  .regex(
    /^(?=.*[a-zA-Z가-힣])[a-zA-Z가-힣0-9]{1,20}$/,
    "닉네임은 영어, 한글, 숫자만 가능하며 숫자만으로는 불가능합니다."
  );

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    try {
      usernameSchema.parse(username);
      passwordSchema.parse(password);
      nicknameSchema.parse(nickname);

      await createUserWithEmailAndPassword(
        auth,
        username + "@example.com",
        password
      );
      alert("회원가입 성공!");
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        setError("회원가입 실패: " + (err as Error).message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-xl font-bold mb-4">회원가입</h2>
      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 mb-2 w-64"
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-2 w-64"
      />
      <input
        type="text"
        placeholder="닉네임"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        className="border p-2 mb-2 w-64"
      />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        onClick={handleSignUp}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        가입하기
      </button>
    </div>
  );
};

export default SignUpPage;
