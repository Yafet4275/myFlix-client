import { Container } from 'react-bootstrap';
import './App.css';
import {MainView} from './components/Mainview/MainView';

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
