import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Start from './components/Start';
import Categories from './components/Categories';
import ShowGame from './components/ShowGame';
import ShowResults from './components/ShowResults';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Start />} />

          <Route path="/categories" element={<Categories />} />

          <Route path="/game/:id/:difficultyLevel" element={<ShowGame />} />

          <Route path="/results/:time/:correctAnswers/:isCorrect/:difficultyLevel/:category" element={<ShowResults />} />

          <Route path='*' element={<h1>404 - Not Found!</h1>} />
          
        </Routes>
      </div>
    </Router>

  );
}

export default App;
