import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/bac_mt_course",
  server: {
    port: 3000,
    fs: {
      allow: ["."], // 특정 폴더 접근 허용
    },
  },
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
