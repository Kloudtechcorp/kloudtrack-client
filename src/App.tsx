import { Routes, Route } from "react-router-dom";
import Signin from "./_auth/Signin";
import RootLayout from "./_root/RootLayout";
import Map from "./_root/pages/Map";
import Himawari from "./_root/pages/Himawari";
import Dashboard from "./_root/pages/Dashboard";
import Settings from "./_root/pages/Settings";
import Variable from "./_root/pages/Variable";
import DataDashboard from "./_root/pages/DataDashboard";
import Test from "./test/Test";
import { Toaster } from "react-hot-toast";
import AdminSettings from "./_root/pages/AdminSettings";
import { UserProvider } from "./hooks/context/userContext";
import VariableDashboard from "./_root/pages/VariableDashboard";

function App() {
  return (
    <>
      <UserProvider>
        <main className="flex h-screen">
          <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route element={<RootLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="/map" element={<Map />} />
              <Route path="/satellite" element={<Himawari />} />
              <Route path="/graphs" element={<Variable />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/administrator" element={<AdminSettings />} />
              <Route path="/:station" element={<DataDashboard />} />
              <Route
                path="/:station/data-analysis"
                element={<VariableDashboard />}
              />

              <Route path="/admin-settings" element={<AdminSettings />}></Route>
            </Route>
          </Routes>
          <Toaster position="top-center" reverseOrder={false} />
        </main>
      </UserProvider>
    </>
  );
}

export default App;
