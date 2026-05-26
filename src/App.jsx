import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';
import { ThemeProvider } from './context/ThemeContext';
import AppRoutes from './routes/AppRoutes';
import './styles/globals.css';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const App = () => (
  <Authenticator>
    {({ signOut, user }) => (
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <ResumeProvider>
              <AppRoutes />
            </ResumeProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    )}
  </Authenticator>
);

export default App;