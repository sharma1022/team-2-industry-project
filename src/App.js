import './App.css';
import Onboarding from './pages/Onboarding';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header>

      </header>
      <Routes>
        <Route path="/onboarding" element={<Onboarding />}/>
      </Routes>
    </div>
  );
}

export default App;
