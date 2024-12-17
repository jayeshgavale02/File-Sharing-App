import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Fileupload from "./pages/Fileupload";
import FileInfoPage from "./pages/FileInfoPage";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute"; // Assuming this is the ProtectedRoute component
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import sToast style

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={<ProtectedRoute element={Dashboard} />}
        />
        <Route
          path="/Fileupload"
          element={<ProtectedRoute element={Fileupload} />}
        />
        <Route path="/Profile" element={<ProtectedRoute element={Profile} />} />
        <Route path="/file-info/:fileUrl/:fileID" element={<FileInfoPage />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
