import { Routes, Route } from "react-router-dom";
import Signin from "./_auth/signin";
import RootLayout from "./_root/RootLayout";
import Map from "./_root/pages/Map";
import Himawari from "./_root/pages/Himawari";
import Dashboard from "./_root/pages/home/Home";
import Settings from "./_root/pages/settings/Settings";
import Variable from "./_root/pages/Variable";
import DataDashboard from "./_root/pages/DataDashboard";
import { Toaster } from "@/components/ui/toaster";
import { SonnerToaster } from "@/components/ui/sonner";
import AdminSettings from "./_root/pages/admin/AdminSettings";
import VariableDashboard from "./_root/pages/VariableDashboard";
import NotFound from "./components/shared/NotFound";
import Reference from "./_root/pages/Reference";

function App() {
  return (
    <>
      <main className="flex h-screen w-full">
        <Routes>
          <Route path="/signin" element={<Signin />} />

          <Route element={<RootLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/map" element={<Map />} />
            <Route path="/satellite" element={<Himawari />} />
            <Route path="/graphs" element={<Variable />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/references" element={<Reference />} />

            <Route path="/:station/" element={<DataDashboard />} />

            <Route
              path="/:station/data-analysis"
              element={<VariableDashboard />}
            />
            <Route path="/admin-settings" element={<AdminSettings />} />
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
