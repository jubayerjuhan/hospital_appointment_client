import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";
import { Toaster } from "react-hot-toast";
import SignUp from "./pages/Signup/Signup";
import BookAppointment from "./pages/BookAppointment/BookAppointment";
import AllAppointments from "./pages/AllAppointments/AllAppointments";
import MyAppointments from "./pages/MyAppointments/MyAppointments";

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route element={<Homepage />} path="/"></Route>
          <Route element={<Login />} path="/login"></Route>
          <Route element={<SignUp />} path="/sign-up"></Route>
          <Route element={<BookAppointment />} path="/book-appointment"></Route>
          <Route element={<AllAppointments />} path="/all-appointments"></Route>
          <Route element={<MyAppointments />} path="/my-appointments"></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
