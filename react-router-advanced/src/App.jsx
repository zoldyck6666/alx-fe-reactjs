import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogPost from "./components/BlogPost"; // import the component

function App() {
  return (
    <Router>
      <Routes>
        {/* Other routes */}
        <Route path="/blog/:id" element={<BlogPost />} />
      </Routes>
    </Router>
  );
}

export default App;
