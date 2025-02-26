import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  getFirestore,
} from "firebase/firestore";

import { ArrowLeft } from "lucide-react";
import { db } from "../utils/firebaseConfig";

interface FormData {
  username: string;
  password: string;
  nickname: string;
}

interface FormErrors {
  username?: string;
  password?: string;
  nickname?: string;
}

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    nickname: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // 입력 변경 시 해당 필드의 오류 메시지 초기화
    setErrors({
      ...errors,
      [name]: undefined,
    });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // 아이디 검증: 영어 소문자, 숫자, 특수문자 '_'만 허용, 5~20자
    if (!formData.username.match(/^[a-z0-9_]{5,20}$/)) {
      newErrors.username =
        "아이디는 영어 소문자, 숫자, 특수문자(_)만 사용 가능하며 5~20자여야 합니다.";
      isValid = false;
    }

    // 비밀번호 검증: 5~20자
    if (formData.password.length < 5 || formData.password.length > 20) {
      newErrors.password = "비밀번호는 5~20자여야 합니다.";
      isValid = false;
    }

    // 닉네임 검증: 특수문자 불가, 영어, 한글, 숫자 가능, 숫자만으로는 불가능
    if (!formData.nickname.match(/^(?!^\d+$)[a-zA-Z가-힣0-9]{1,20}$/)) {
      newErrors.nickname =
        "닉네임은 영어, 한글, 숫자만 사용 가능하며 숫자로만 구성될 수 없습니다.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Firebase Authentication을 사용하여 이메일 기반 계정 생성
      // 실제 이메일 형식을 갖추기 위해 사용자명에 가상 도메인을 추가
      // const email = `${formData.username}@yourdomain.com`;
      // const userCredential = await createUserWithEmailAndPassword(
      //   auth,
      //   email,
      //   formData.password
      // );
      // const user = userCredential.user;

      // // 사용자 프로필 업데이트 (닉네임)
      // await updateProfile(user, {
      //   displayName: formData.nickname,
      // });

      // Firestore에 추가 사용자 정보 저장
      const usersRef = collection(db, "users");

      // 현재 컬렉션의 문서 개수를 가져옴
      const snapshot = await getDocs(usersRef);
      const currentLength = snapshot.size; // 문서 개수

      // 새로운 ID 계산
      const newID = currentLength + 1;

      await setDoc(doc(db, "users", newID), {
        username: formData.username,
        nickname: formData.nickname,
        createdAt: new Date(),
      });

      setSuccessMessage("회원가입이 성공적으로 완료되었습니다!");
      // 폼 초기화
      setFormData({
        username: "",
        password: "",
        nickname: "",
      });
    } catch (error: any) {
      let message = "회원가입 중 오류가 발생했습니다.";
      if (error.code === "auth/email-already-in-use") {
        message = "이미 사용 중인 아이디입니다.";
      }
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen   bg-gray-50">
      {/* <div className="min-h-screen flex  justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"> */}
      <div className="container mx-auto px-4 py-8 ">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          돌아가기
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-8">회원가입</h1>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                아이디
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="아이디 (5~20자, 영문 소문자/숫자/_)"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && (
                <p className="mt-2 text-sm text-red-600">{errors.username}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="비밀번호 (5~20자)"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="nickname"
                className="block text-sm font-medium text-gray-700"
              >
                닉네임
              </label>
              <input
                id="nickname"
                name="nickname"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="닉네임 (영문/한글/숫자, 숫자만은 불가)"
                value={formData.nickname}
                onChange={handleChange}
              />
              {errors.nickname && (
                <p className="mt-2 text-sm text-red-600">{errors.nickname}</p>
              )}
            </div>
          </div>

          {errorMessage && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    {errorMessage}
                  </h3>
                </div>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    {successMessage}
                  </h3>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
            >
              {isLoading ? "처리 중..." : "회원가입"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
