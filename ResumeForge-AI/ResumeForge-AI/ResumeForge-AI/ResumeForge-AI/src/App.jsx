import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';
import { ThemeProvider } from './context/ThemeContext';
import AppRoutes from './routes/AppRoutes';
import './styles/globals.css';

const App = () => (
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <ResumeProvider>
          <AppRoutes />
        </ResumeProvider>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
