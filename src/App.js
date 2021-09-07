import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import Routes from './routes.js'
function App() {
  return (
    <BrowserRouter>
    <Routes/>
    </BrowserRouter>
  );
}

export default App;
