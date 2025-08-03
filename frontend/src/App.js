import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthPage from "./components/AuthPage"; // SignUp Page
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
