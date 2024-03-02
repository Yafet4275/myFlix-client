import { Container } from 'react-bootstrap';
import './App.css';
import {MainView} from './components/mainview/MainView';
import {LoginView} from './components/login-view/login-view';
import { SignupView } from './components/signup-view/signup-view';

const router  = createBrowserRouter([
  {
    path: '/movies',
    element: <MoviesView />,
    errorElement: <NoFoundPage />
  },
  {
    path: '/profile',
    element: <ProfileView />,
    errorElement: <NoFoundPage />
  },
  {
    path: '/login',
    element: <LoginView />,
    errorElement: <NoFoundPage />
  },
  {
    path: '/signup',
    element: <SignupView />,
    errorElement: <NoFoundPage />
  },
]);

function App() {
  return (
    <div className="App">
      <Container>
        < MainView />
      </Container>
    </div>
  );
}

export default App;