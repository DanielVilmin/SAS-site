import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicPage from '../pages/PublicPage';
import LoginPage from '../features/auth/LoginPage';
import AdminPage from '../pages/AdminPage';
import ProtectedRoute from '../components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública */}
        <Route path="/" element={<PublicPage />} />
        
        {/* Rota de login admin */}
        <Route path="/adminsas" element={<LoginPage />} />
        
        {/* Rota protegida admin */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Redirecionar rotas inválidas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}