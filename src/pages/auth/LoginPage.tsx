import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { auth } from "../../utils/firebaseConfig";
import { getUserData } from "../../services/userApi";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isForgot, setIsForgot] = useState<boolean>(false);

  /** 로그인 처리 */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      await getUserData();

      navigate("/"); // 로그인 성공 후 이동할 페이지
    } catch (error: any) {
      handleAuthError(error.code);
    } finally {
      setIsLoading(false);
    }
  };

  /** Firebase 로그인 오류 코드 처리 */
  const handleAuthError = (errorCode: string) => {
    setIsForgot(true);
    switch (errorCode) {
      case "auth/invalid-email":
        setErrorMessage("잘못된 이메일 형식입니다.");
        break;
      case "auth/user-not-found":
        setErrorMessage("등록되지 않은 이메일입니다.");
        break;
      case "auth/wrong-password":
        setErrorMessage("비밀번호가 올바르지 않습니다.");
        break;
      case "auth/invalid-credential":
        setErrorMessage("이메일 또는 비밀번호가 올바르지 않습니다.");
        break;
      default:
        setErrorMessage("로그인 중 오류가 발생했습니다.");
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setErrorMessage("이메일을 입력하세요.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email.trim());
      alert("비밀번호 재설정 이메일을 보냈습니다!");
    } catch (error) {
      console.error("비밀번호 재설정 오류:", error);
      setErrorMessage("비밀번호 재설정 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="h-full mb-[100px] hide-scrollbar">
      <header
        className={`fixed px-6 pt-[26px] top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out flex justify-between items-center bg-main-white`}
        style={{ height: `100px` }}
      >
        <div
          className="p-4 cursor-pointer"
          onClick={() => {
            navigate(-1);
            // componentStore.setOpenFullModal("summitList");
          }}
        >
          <ChevronLeft />
        </div>
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
        </div>
        <div className="p-8">
          <div className="text-[24px] font-light mb-4">로그인</div>
          <form className="" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsForgot(false);
              }}
              className="mb-2 w-full px-4 py-3 font-light border h-[48px] border-gray-200 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-12 w-full px-4 py-3 font-light border h-[48px] border-gray-200 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-200"
            />

            {errorMessage && (
              <p className="text-xs text-red-500">{errorMessage}</p>
            )}
            {isForgot && (
              <button
                onClick={handleResetPassword}
                className="text-xs text-blue-500 underline"
              >
                비밀번호를 잊으셨나요?
              </button>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-[24px] font-light  transition focus:outline-none shadow-[0_4px_4px_rgba(0,0,0,0.1)] ${
                isLoading
                  ? "bg-gray-300 text-gray-700"
                  : "bg-main-green-200 text-main-white hover:bg-blue-600"
              }`}
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </button>
          </form>
        </div>
      </main>
    </div>

    // <div className="min-h-screen flex items-start justify-center bg-main-white py-12 px-4 sm:px-6 lg:px-8">
    //   <div className="max-w-md w-full space-y-6">
    //     <button
    //       onClick={() => navigate(-1)}
    //       className="flex items-center text-gray-500 hover:text-gray-700 transition mb-6"
    //     >
    //       <ArrowLeft className="w-5 h-5 mr-2" />
    //     </button>
    //     <h1 className="text-3xl font-light text-gray-900">로그인</h1>

    //     <form className="space-y-4" onSubmit={handleLogin}>
    //       <input
    //         type="email"
    //         placeholder="이메일"
    //         value={email}
    //         onChange={(e) => {
    //           setEmail(e.target.value);
    //           setIsForgot(false);
    //         }}
    //         className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
    //       />
    //       <input
    //         type="password"
    //         placeholder="비밀번호"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
    //       />

    //       {errorMessage && (
    //         <p className="text-xs text-red-500">{errorMessage}</p>
    //       )}
    //       {isForgot && (
    //         <button
    //           onClick={handleResetPassword}
    //           className="text-xs text-blue-500 underline"
    //         >
    //           비밀번호를 잊으셨나요?
    //         </button>
    //       )}

    //       <button
    //         type="submit"
    //         disabled={isLoading}
    //         className={`w-full py-3 rounded-md shadow-sm transition focus:outline-none ${
    //           isLoading
    //             ? "bg-gray-300 text-gray-700"
    //             : "bg-blue-500 text-main-white hover:bg-blue-600"
    //         }`}
    //       >
    //         {isLoading ? "로그인 중..." : "로그인"}
    //       </button>
    //     </form>

    //     <p className="text-xs text-gray-500">
    //       계정이 없으신가요?{" "}
    //       <button
    //         onClick={() => navigate("/sign-up")}
    //         className="text-blue-500 underline transition hover:text-blue-600"
    //       >
    //         회원가입
    //       </button>
    //     </p>
    //   </div>
    // </div>
  );
};

export default LoginPage;
