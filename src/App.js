import Home from './pages/Home';
import Single from './pages/Single';
import Search from './pages/Search';
import Update from './pages/Update';
import Create from './pages/Create';
import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/job-offer/:id" element={<Single />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
