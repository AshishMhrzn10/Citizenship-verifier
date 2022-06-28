import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Status from './components/Status/Status';
import Post from './components/Post/Post';

function App() {
  const loginUser = localStorage.getItem('users');
  return (
    <div className="App">
      <Router>
        <Routes>
          {
            loginUser === "undefined" ?
              <Route path="/login" element={<Login />} /> :
              <Route exact path="/" element={<Home />} />
          }
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/status" element={<Status />} />
          <Route path="/post/:id/:email" element={<Post />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
