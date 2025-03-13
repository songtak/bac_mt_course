import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../utils/firebaseConfig";
import { ArrowLeft } from "lucide-react";
import _ from "lodash";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
}

/** 회원가입 */
const SignUpPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEmailChecked, setIsEmailChecked] = useState<boolean>(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState<string>("");
  const [emailSuccessMessage, setEmailSuccessMessage] = useState<string>("");
  const [nicknameSuccessMessage, setNicknameSuccessMessage] =
    useState<string>("");

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email") {
      setIsEmailChecked(false);
      setEmailSuccessMessage("");
    }
    if (name === "nickname") {
      setIsNicknameChecked(false);
      setNicknameSuccessMessage("");
    }
  };

  const checkDuplicate = async (field: "email" | "nickname", value: string) => {
    if (!value) return;

    setIsLoading(true);
    setEmailErrorMessage("");
    setNicknameErrorMessage("");

    if (field === "email") {
      if (!emailRegex.test(value)) {
        setEmailErrorMessage("올바른 이메일 형식을 입력하세요.");
        setIsEmailChecked(false);
        setIsLoading(false);
        return;
      }
    }

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where(field, "==", value));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        field === "email"
          ? setEmailErrorMessage("이미 사용 중인 이메일입니다.")
          : setNicknameErrorMessage("이미 사용 중인 닉네임입니다.");

        field === "email"
          ? setIsEmailChecked(false)
          : setIsNicknameChecked(false);
      } else {
        field === "email"
          ? setEmailSuccessMessage("사용 가능한 이메일입니다.")
          : setNicknameSuccessMessage("사용 가능한 닉네임입니다.");
        field === "email"
          ? setIsEmailChecked(true)
          : setIsNicknameChecked(true);
      }
    } catch (error) {
      console.log("error", error);

      field === "email"
        ? setEmailErrorMessage("이메일 중복 확인 중 오류가 발생했습니다.")
        : setNicknameErrorMessage("닉네임 중복 확인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.email &&
      formData.password.length > 5 &&
      formData.confirmPassword &&
      formData.nickname &&
      formData.password === formData.confirmPassword &&
      isEmailChecked &&
      isNicknameChecked
    );
  };

  /** 회원 가입 */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) return;

    setIsLoading(true);

    try {
      // Firebase Auth 회원가입
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Firebase에서 생성된 유저 ID
      const user = userCredential.user;
      const token = await user.getIdToken(); // 🔥 JWT 토큰 가져오기

      const usersRef = collection(db, "users");
      const snapshot = await getDocs(usersRef);
      const newUserId = snapshot.size + 1;

      // Firestore에 유저 정보 저장
      await setDoc(doc(db, "users", formData.email), {
        access_token: token, // 🔥 JWT 토큰 저장
        email: formData.email,
        name: formData.name,
        nickname: formData.nickname,
        password: formData.password,
        userId: newUserId,
        createdAt: new Date(),
      });

      console.log("회원가입이 성공적으로 완료되었습니다!");
      localStorage.setItem("access_token", token);
      setTimeout(() => navigate(-1), 1500);
    } catch (error: any) {
      console.error("회원가입 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-500 hover:text-gray-700 transition mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
        </button>
        <h1 className="text-3xl font-light text-gray-900">회원가입</h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="이름"
            maxLength={20}
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <div className="flex space-x-3">
            <input
              type="email"
              name="email"
              placeholder="이메일"
              value={formData.email}
              onChange={handleChange}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <button
              type="button"
              onClick={() => checkDuplicate("email", formData.email)}
              disabled={isLoading || isEmailChecked || formData.email === ""}
              className={`px-4 py-3 rounded-md transition ${
                isLoading || isEmailChecked || formData.email === ""
                  ? "bg-gray-200 text-gray-500"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              중복 확인
            </button>
          </div>
          <span className="text-xs text-gray-500">{emailSuccessMessage}</span>
          <span className="text-xs text-red-500">{emailErrorMessage}</span>
          <div className="flex space-x-3">
            <input
              type="text"
              name="nickname"
              placeholder="닉네임"
              value={formData.nickname}
              onChange={handleChange}
              maxLength={40}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <button
              type="button"
              onClick={() => checkDuplicate("nickname", formData.nickname)}
              disabled={
                isLoading || isNicknameChecked || formData.nickname === ""
              }
              className={`px-4 py-3 rounded-md transition ${
                isLoading || isNicknameChecked || formData.nickname === ""
                  ? "bg-gray-200 text-gray-500"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              중복 확인
            </button>
          </div>
          <span className="text-xs text-gray-500">
            {nicknameSuccessMessage}
          </span>
          <span className="text-xs text-red-500">{nicknameErrorMessage}</span>
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            maxLength={12}
            className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          {formData.password.length > 0 && formData.password.length < 6 && (
            <span className="text-xs text-red-500">
              비밀번호는 6자리 이상 12자리 이하만 가능합니다.
            </span>
          )}
          <input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            value={formData.confirmPassword}
            onChange={handleChange}
            maxLength={12}
            className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          {formData.confirmPassword.length > 0 &&
            formData.password !== formData.confirmPassword && (
              <span className="text-xs text-red-500">
                비밀번호가 같지 않습니다.
              </span>
            )}
          <button
            type="submit"
            disabled={!isFormValid() || isLoading}
            className={`w-full py-3 rounded-md transition focus:outline-none ${
              isFormValid() && !isLoading
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {isLoading ? "로그인 중..." : "회원가입"}
          </button>
        </form>
        <p className="text-xs text-gray-500">
          계정이 없으신가요?{" "}
          <button
            onClick={() => navigate("/sign-up")}
            className="text-blue-500 underline transition hover:text-blue-600"
          >
            회원가입
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
