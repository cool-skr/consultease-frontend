import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './components/login/Login';
import HomePage from './components/home/HomePage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import SignUpUser from './components/signup/SignUpUser';
import ProjectForm from './components/project/ProjectForm';
import ProjectPage from "./components/project/ProjectPage";
import ProjectEditPage from "./components/project/ProjectEditPage";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUpUser />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/project/new" 
            element={
              <ProtectedRoute>
                <ProjectForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/project/:projectId" 
            element={
              <ProtectedRoute>
                <ProjectPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/project/edit/:projectId" 
            element={
              <ProtectedRoute>
                <ProjectEditPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App