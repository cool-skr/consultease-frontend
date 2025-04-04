import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './components/login/Login.jsx';
import HomePage from './components/home/HomePage.jsx';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';
import SignUpUser from './components/signup/SignUpUser';
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } 
          />
          <Route path="/signup" element={<SignUpUser />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App