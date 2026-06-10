import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./component/Dashboard/dashboard";
import FlightsPage from "./component/Flight/flightPage";
import FlightResults from "./component/Flight/flightResult";
import Login from "./component/Auth/login";
import Register from "./component/Auth/register";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/flights" element={<FlightsPage />} />
        <Route path="/flights/results" element={<FlightResults />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
