import { Routes, Route } from "react-router-dom";
import Signin from "./_auth/Signin";
import RootLayout from "./_root/RootLayout";
import Map from "./_root/pages/Map";
import Himawari from "./_root/pages/Himawari";
import Dashboard from "./_root/pages/Dashboard";
import TestCsv from "./_root/pages/TestCsv";
import Settings from "./_root/pages/Settings";
import Variable from "./_root/pages/Variable";
import DataDashboard from "./_root/pages/DataDashboard";
import SampleDashboard from "./_root/pages/SampleDashboard";
import Login from "./_root/pages/Login";
import Register from "./_root/pages/Register";
import Test from "./test/Test";
import { Toaster } from "react-hot-toast";
import AdminSettings from "./_root/pages/AdminSettings";
import { UserProvider } from "./lib/context/userContext";
import { StationDataProvider } from "./lib/context/stationContext";
import UserCreation from "./_root/pages/adminpages/UserCreation";
import StationRegistration from "./_root/pages/adminpages/StationRegistration";
import Stations from "./_root/pages/Stations";
import VariableDashboard from "./_root/pages/VariableDashboard";

function App() {
  return (
    <>
      <StationDataProvider>
        <UserProvider>
          <main className="flex h-screen">
            <Routes>
              <Route path="/signin" element={<Signin />} />
              <Route path="/test" element={<Test />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />{" "}
              <Route path="/csv" element={<TestCsv />} />{" "}
              <Route path="/test" element={<Test />} />{" "}
              <Route path="/sampleDashboard" element={<SampleDashboard />} />
              <Route element={<RootLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="/map" element={<Map />} />
                <Route path="/satellite" element={<Himawari />} />
                <Route path="/graphs" element={<Variable />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/administrator" element={<AdminSettings />} />
                <Route path="/dashboard/:station" element={<DataDashboard />} />
                <Route
                  path="/dashboard/:station/graphs"
                  element={<VariableDashboard />}
                />

                <Route
                  path="/admin-settings"
                  element={<AdminSettings />}
                ></Route>
              </Route>
            </Routes>
            <Toaster position="top-center" reverseOrder={false} />
          </main>
        </UserProvider>
      </StationDataProvider>
    </>
  );
}

export default App;
