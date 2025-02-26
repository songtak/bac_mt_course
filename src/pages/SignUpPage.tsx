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

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  region: string;
  sex: "남자" | "여자" | null;
  birth?: string;
}

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    region: "",
    sex: null,
    birth: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEmailChecked, setIsEmailChecked] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email") {
      setIsEmailChecked(false);
    }
  };

  const checkEmailDuplicate = async () => {
    if (!formData.email.includes("@")) {
      setErrorMessage("올바른 이메일 형식을 입력하세요.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", formData.email));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        setErrorMessage("이미 사용 중인 이메일입니다.");
        setIsEmailChecked(false);
      } else {
        setSuccessMessage("사용 가능한 이메일입니다.");
        setIsEmailChecked(true);
      }
    } catch (error) {
      setErrorMessage("이메일 중복 확인 중 오류가 발생했습니다.");
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
      formData.region &&
      formData.sex &&
      formData.password === formData.confirmPassword &&
      isEmailChecked
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!isFormValid() || !isEmailChecked) {
      return;
    }

    setIsLoading(true);

    try {
      const usersRef = collection(db, "users");
      const snapshot = await getDocs(usersRef);
      const newUserId = snapshot.size + 1;

      const hashedToken = CryptoJS.AES.encrypt(
        `${newUserId}${formData.email}`,
        "greenturtle"
      ).toString();

      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await setDoc(doc(db, "users", formData.email), {
        access_token: hashedToken,
        email: formData.email,
        name: formData.name,
        password: formData.password,
        region: formData.region,
        sex: formData.sex,
        userId: newUserId,
        birth: formData.birth || "",
        createdAt: new Date(),
      });

      setSuccessMessage("회원가입이 성공적으로 완료되었습니다!");
      setTimeout(() => navigate(-1), 1500);
    } catch (error: any) {
      setErrorMessage("회원가입 중 오류가 발생했습니다.");
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
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          회원가입
        </h1>

        <form className="space-y-4">
          {/* 이름 */}
          <input
            type="text"
            name="name"
            placeholder="이름"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />

          {/* 이메일 */}
          <div className="flex space-x-2">
            <input
              type="email"
              name="email"
              placeholder="이메일"
              value={formData.email}
              onChange={handleChange}
              className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={checkEmailDuplicate}
              disabled={!formData.email || isLoading || isEmailChecked}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300"
            >
              중복 확인
            </button>
          </div>

          {/* 비밀번호 */}
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />

          {/* 지역 선택 */}
          <select
            name="region"
            value={formData.region}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">지역 선택</option>
            <option value="서울">서울</option>
            <option value="부산">부산</option>
            <option value="대구">대구</option>
            <option value="광주">광주</option>
            <option value="대전">대전</option>
            <option value="울산">울산</option>
          </select>

          {/* 성별 선택 */}
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="sex"
                value="남자"
                onChange={handleChange}
                className="mr-2"
              />
              남자
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="sex"
                value="여자"
                onChange={handleChange}
                className="mr-2"
              />
              여자
            </label>
          </div>

          {/* 생년월일 */}
          <input
            type="date"
            name="birth"
            value={formData.birth}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />

          {/* 회원가입 버튼 */}
          <button
            type="submit"
            disabled={!isFormValid() || isLoading}
            onClick={handleSubmit}
            className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-300"
          >
            회원가입
          </button>

          {/* 에러 메시지 */}
          {errorMessage && (
            <p className="text-red-600 text-sm text-center">{errorMessage}</p>
          )}

          {/* 성공 메시지 */}
          {successMessage && (
            <p className="text-green-600 text-sm text-center">
              {successMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
