import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/

export default defineConfig({
  theme: {
    extend: {
      colors: {
        gray:"#5A5959",
        yellow:"#FFEAAE",
        "dark-yellow":"#FCCA3F",
        orange:"#F6820C",
      },
    },
  },
  plugins: [tailwindcss(),react()],
})

