import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" keeps asset paths relative, so the build works on GitHub Pages under /Zero-to-AIEngineer/
export default defineConfig({
  base: "./",
  plugins: [react()],
});
