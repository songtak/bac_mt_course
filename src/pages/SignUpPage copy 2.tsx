import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { db } from "../utils/firebaseConfig";
import { ArrowLeft } from "lucide-react";
import _ from "lodash";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
}

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const auth = getAuth();

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
          ? setEmailErrorMessage(
              `이미 사용 중인 ${field === "email" ? "이메일" : "닉네임"}입니다.`
            )
          : setNicknameErrorMessage("이미 사용 중인 닉네임입니다.");

        field === "email"
          ? setIsEmailChecked(false)
          : setIsNicknameChecked(false);
      } else {
        field === "email"
          ? setEmailSuccessMessage(
              `사용 가능한 ${field === "email" ? "이메일" : "닉네임"}입니다.`
            )
          : setNicknameSuccessMessage(`사용 가능한 닉네임입니다.`);
        field === "email"
          ? setIsEmailChecked(true)
          : setIsNicknameChecked(true);
      }
    } catch (error) {
      field === "email"
        ? setEmailErrorMessage(
            `${
              field === "email" ? "이메일" : "닉네임"
            } 중복 확인 중 오류가 발생했습니다.`
          )
        : setNicknameErrorMessage(`닉네임 중복 확인 중 오류가 발생했습니다.`);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.email &&
      formData.password &&
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
    // setErrorMessage("");
    // setSuccessMessage("");

    if (!isFormValid()) return;

    setIsLoading(true);

    try {
      const usersRef = collection(db, "users");
      const snapshot = await getDocs(usersRef);
      const newUserId = snapshot.size + 1;

      const hashedToken = CryptoJS.AES.encrypt(
        `${newUserId}${formData.email}`,
        "greenturtle"
      ).toString();

      console.log("hashedToken", hashedToken);

      // await createUserWithEmailAndPassword(
      //   auth,
      //   formData.email,
      //   formData.password
      // );

      await setDoc(doc(db, "users", formData.email), {
        access_token: hashedToken,
        email: formData.email,
        name: formData.name,
        nickname: formData.nickname,
        password: formData.password,
        userId: newUserId,
        createdAt: new Date(),
      });

      // setSuccessMessage("회원가입이 성공적으로 완료되었습니다!");
      // setTimeout(() => navigate(-1), 1500);
    } catch (error: any) {
      // setErrorMessage("회원가입 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
        </button>
        <h1 className="text-3xl font-bold text-gray-800">회원가입</h1>

        <form className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="이름"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />

          <div className="flex space-x-2">
            <input
              type="email"
              name="email"
              placeholder="이메일"
              value={formData.email}
              onChange={handleChange}
              className="flex-1 p-3 border border-gray-300 rounded-md"
            />
            <button
              type="button"
              onClick={() => checkDuplicate("email", formData.email)}
              disabled={isLoading || isEmailChecked || formData.email === ""}
              className={`px-4 py-2 ${
                isLoading || isEmailChecked || formData.email === ""
                  ? "bg-gray-300"
                  : "bg-blue-500"
              }  text-white rounded-md`}
            >
              중복 확인
            </button>
          </div>
          <span className="text-xs text-gray-500 ">{emailSuccessMessage}</span>
          <span className="text-xs text-red-500 ">{emailErrorMessage}</span>

          <div className="flex space-x-2">
            <input
              type="text"
              name="nickname"
              placeholder="닉네임"
              value={formData.nickname}
              onChange={handleChange}
              maxLength={20}
              className="flex-1 p-3 border border-gray-300 rounded-md"
            />
            <button
              type="button"
              onClick={() => checkDuplicate("nickname", formData.nickname)}
              disabled={
                isLoading || isNicknameChecked || formData.nickname === ""
              }
              className={`px-4 py-2 ${
                isLoading || isNicknameChecked || formData.nickname === ""
                  ? "bg-gray-300"
                  : "bg-blue-500"
              }  text-white rounded-md`}
            >
              중복 확인
            </button>
          </div>
          <span className="text-xs text-gray-500 ">
            {nicknameSuccessMessage}
          </span>
          <span className="text-xs text-red-500 ">{nicknameErrorMessage}</span>

          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            maxLength={20}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            value={formData.confirmPassword}
            onChange={handleChange}
            maxLength={20}
            className="w-full p-3 border border-gray-300 rounded-md"
          />

          <button
            type="submit"
            disabled={!isFormValid() || isLoading}
            onClick={handleSubmit}
            className={`w-full py-3 ${
              isFormValid() ? "bg-blue-500" : "bg-gray-300"
            }  text-white rounded-md`}
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
