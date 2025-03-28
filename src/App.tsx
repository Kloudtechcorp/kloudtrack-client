import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { SonnerToaster } from "@/components/ui/sonner";
import {
  AdminSettings,
  Dashboard,
  DataGraphs,
  Graphs,
  Home,
  Map,
  NotFound,
  Reference,
  Satellite,
  Settings,
  SignIn,
} from "@/pages";
import RootLayout from "@/layouts/RootLayout";

function App() {
  return (
    <>
      <main className="flex h-screen w-full">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/map" element={<Map />} />
            <Route path="/satellite" element={<Satellite />} />
            <Route path="/graphs" element={<Graphs />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/references" element={<Reference />} />
            <Route path="/admin-settings" element={<AdminSettings />} />
            <Route path="/:station/" element={<Dashboard />} />
            <Route path="/:station/data-analysis" element={<DataGraphs />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <Toaster />
        <SonnerToaster />
      </main>
    </>
  );
}

export default App;
