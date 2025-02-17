import logo from './logo.svg';
import './App.css';
import FetchMoviesList from './FetchMoviesList';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddMovie from './AddMovie';




function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Routes>
  <Route path="list" element={<FetchMoviesList />} />
  <Route path="add" element={<AddMovie />} />
</Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
