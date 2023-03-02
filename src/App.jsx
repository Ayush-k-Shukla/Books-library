import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home.page';
import SubjectPage from './pages/subject/subject.page';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:subject' element={<SubjectPage />} />
      </Routes>
    </div>
  );
}

export default App;
