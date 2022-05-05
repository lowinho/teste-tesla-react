import { BrowserRouter } from 'react-router-dom'
import { Router } from './routes/routes';
import { ToastContainer } from 'react-toastify';
import { AuthContextProvider } from './contexts/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Router />
        <ToastContainer />
      </AuthContextProvider> 
    </BrowserRouter>
  );
}

export default App;
