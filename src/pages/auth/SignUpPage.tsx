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
import { db, auth } from "../../utils/firebaseConfig";
import { ChevronLeft } from "lucide-react";
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
  const [selectedGender, setSelectedGender] = useState("");

  const options = ["여성", "남성", "선택 안 함"];

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
    <div className="h-full mb-[100px] hide-scrollbar">
      <header
        className={`fixed px-6 pt-[26px] top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out flex justify-between items-center bg-main-white`}
        style={{ height: `100px` }}
      >
        <ChevronLeft
          onClick={() => {
            navigate(-1);
            // componentStore.setOpenFullModal("summitList");
          }}
        />
      </header>
      <main className="pt-[100px]">
        <div className="flex justify-center items-center">
          <div>
            <img
              src="https://songtak.github.io/bac_mt_course/assets/images/logo.png"
              alt="PeakHunter 로고"
            />
            <div className="pl-2 text-[12px] font-thin text-black text-center">
              당신의 모든 산행이 이곳에
            </div>
          </div>
        </div>{" "}
        <div className="p-8 text-main-gray-300">
          <div className="text-[24px] font-light mb-4 text-main-black">
            회원가입
          </div>
          <form className="" onSubmit={handleSubmit}>
            {/* <input
              type="text"
              name="name"
              placeholder="이름"
              maxLength={20}
              value={formData.name}
              onChange={handleChange}
              className="mb-2 w-full px-4 py-3 font-light border h-[48px] border-gray-200 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-200"
            /> */}
            <div className="flex space-x-3">
              <input
                type="email"
                name="email"
                placeholder="이메일"
                value={formData.email}
                onChange={handleChange}
                className="mb-2 w-full px-4 py-3 font-light border h-[48px] border-gray-200 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <button
                type="button"
                onClick={() => checkDuplicate("email", formData.email)}
                disabled={isLoading || isEmailChecked || formData.email === ""}
                className={`whitespace-nowrap px-4 py-3 font-extralight rounded-[12px] transition w-[90px] h-[48px] text-[14px] shadow-[0_4px_4px_rgba(0,0,0,0.1)] ${
                  isLoading || isEmailChecked || formData.email === ""
                    ? "bg-main-gray-200 text-white"
                    : "bg-main-green-200 text-main-white hover:bg-main-green-300"
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
                className="mb-2 w-full px-4 py-3 font-light border h-[48px] border-gray-200 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <button
                type="button"
                onClick={() => checkDuplicate("nickname", formData.nickname)}
                disabled={
                  isLoading || isNicknameChecked || formData.nickname === ""
                }
                className={`whitespace-nowrap px-4 py-3 font-extralight rounded-[12px] transition w-[90px] h-[48px] text-[14px] shadow-[0_4px_4px_rgba(0,0,0,0.1)] ${
                  isLoading || isNicknameChecked || formData.nickname === ""
                    ? "bg-main-gray-200 text-white"
                    : "bg-main-green-200 text-main-white hover:bg-main-green-300"
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
              className="mb-2 w-full px-4 py-3 font-light border h-[48px] border-gray-200 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-200"
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
              className="mb-2 w-full px-4 py-3 font-light border h-[48px] border-gray-200 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            {formData.confirmPassword.length > 0 &&
              formData.password !== formData.confirmPassword && (
                <span className="text-xs text-red-500">
                  비밀번호가 같지 않습니다.
                </span>
              )}

            <input
              type="password"
              name="confirmPassword"
              placeholder="생년월일"
              value={formData.confirmPassword}
              onChange={handleChange}
              maxLength={12}
              className="mb-2 w-full px-4  py-3 font-light border h-[48px] border-gray-200 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <div></div>
            <div className="w-full px-4 py-3 font-light border bg-white h-[48px] border-gray-200 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-200 flex items-center">
              <span className="text-gray-400  mr-6 whitespace-nowrap">
                성별
              </span>
              <div className="flex space-x-2">
                {options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSelectedGender(option)}
                    className={
                      "px-3 py-1 rounded-full text-[14px] font-light transition whitespace-nowrap h-[34px] " +
                      (selectedGender === option
                        ? "bg-main-green-200 text-white border-blue-500"
                        : "bg-white text-main-gray-300 hover:bg-gray-100")
                    }
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-[12px] font-extralight mt-4 space-y-2">
              <div className="flex items-center">
                <span className="underline">
                  (필수) 서비스 이용약관을 확인하고 동의합니다.
                </span>
                <input
                  type="checkbox"
                  className="w-3 h-3 ml-1 border border-main-gray-100 rounded checked:appearance-none relative
             checked:bg-main-green-200 checked:border-main-green-200
             before:content-[''] before:absolute before:inset-0 before:flex before:items-center before:justify-center
             checked:before:content-['✓'] checked:before:text-white checked:before:text-[10px]"
                />
              </div>

              <div className="flex items-center">
                <span className="underline">
                  (필수) 개인정보 보호 정책을 이해하고 동의합니다.
                </span>
                <input
                  type="checkbox"
                  className="w-3 h-3 ml-1 border border-main-gray-100 rounded checked:appearance-none relative
             checked:bg-main-green-200 checked:border-main-green-200
             before:content-[''] before:absolute before:inset-0 before:flex before:items-center before:justify-center
             checked:before:content-['✓'] checked:before:text-white checked:before:text-[10px]"
                />

                {/* <input
                  type="checkbox"
                  className="w-3 h-3 border border-main-gray-100 rounded  accent-main-green-200"
                /> */}
              </div>
              <div className="flex items-center">
                <span>(필수) 만 14세 이상입니다.</span>
                <input
                  type="checkbox"
                  className="w-3 h-3 ml-1 border border-main-gray-100 rounded checked:appearance-none relative
             checked:bg-main-green-200 checked:border-main-green-200
             before:content-[''] before:absolute before:inset-0 before:flex before:items-center before:justify-center
             checked:before:content-['✓'] checked:before:text-white checked:before:text-[10px]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!isFormValid() || isLoading}
              className={`
                fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-md
                shadow-[0_4px_4px_rgba(0,0,0,0.1)]
                py-3 rounded-[24px] transition focus:outline-none ${
                  isFormValid() && !isLoading
                    ? "bg-blue-500 text-main-white hover:bg-blue-600"
                    : "bg-main-gray-200 text-main-white"
                  // ? "bg-blue-500 text-main-white hover:bg-blue-600"
                  // : "bg-gray-200 text-gray-500"
                }`}
            >
              {isLoading ? "로그인 중..." : "회원가입"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignUpPage;
