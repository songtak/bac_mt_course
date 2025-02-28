import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: "/bac_mt_course/",
  base: "",
  server: {
    port: 3000,
    fs: {
      allow: ["."], // 특정 폴더 접근 허용
    },
    proxy: {
      "/weather": {
        target: "https://apihub.kma.go.kr", // 원본 API 서버
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/weather/, ""), // '/api'를 제거하고 요청
      },
    },
  },
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
