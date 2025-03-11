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
      "/api/address": {
        target: "https://naveropenapi.apigw.ntruss.com",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/api\/address/, "/map-reversegeocode/v2/gc"),
        headers: {
          "X-NCP-APIGW-API-KEY-ID": "g4lwz48dq0",
          "X-NCP-APIGW-API-KEY": "d56mkH7Ysp0KHno54kgseH1KNVwI6QysmZxiE8JN",
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
