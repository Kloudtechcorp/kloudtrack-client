import { Routes, Route } from "react-router-dom";
import Signin from "./pages/auth";
import RootLayout from "./layouts/RootLayout";
import Map from "./pages/map/Map";
import Himawari from "./pages/satellite/Himawari";
import Dashboard from "./pages/home/Home";
import Settings from "./settings/Settings";
import Variable from "./pages/graphs/Variable";
import DataDashboard from "./pages/station/dashboard/DataDashboard";
import { Toaster } from "@/components/ui/toaster";
import { SonnerToaster } from "@/components/ui/sonner";
import AdminSettings from "./admin/AdminSettings";
import VariableDashboard from "./pages/station/data-analysis/VariableDashboard";
import NotFound from "./pages/error/NotFound";
import Reference from "./pages/references/Reference";

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
