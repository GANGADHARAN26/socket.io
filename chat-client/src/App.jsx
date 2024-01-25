import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import JoinChat from "./components/JoinChat/JoinChat";
import Register from "./components/Registration/Register";
import Login from "./components/Login/Login";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import io from "socket.io-client";
import Footer from "./components/Footer/Footer";
const socket = io.connect("http://localhost:5000");
function App() {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <Routes>
          <Route path="/chat" element={<JoinChat socket={socket} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
