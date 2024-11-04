import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "./hooks/context/authContext.tsx";
import React from "react";
import { QueryProvider } from "./hooks/react-query/QueryProvider.tsx";
import { SidebarProvider } from "./components/ui/sidebar.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <QueryProvider>
          <AuthProvider>
            <SidebarProvider>
              <App />
            </SidebarProvider>
          </AuthProvider>
        </QueryProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
