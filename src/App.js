import logo from './logo.svg';
import './App.css';
import FetchMoviesList from './FetchMoviesList';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddMovie from './AddMovie';
import { PostsList } from './FetchPosts';




function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Routes>
  <Route path="list" element={<FetchMoviesList />} />
  <Route path="add" element={<AddMovie />} />
  <Route path="posts" element={<PostsList />} />

</Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
