import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";
import { Toaster } from "react-hot-toast";
import SignUp from "./pages/Signup/Signup";
import BookAppointment from "./pages/BookAppointment/BookAppointment";

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
        </Routes>
      </Router>
    </>
  );
}

export default App;
