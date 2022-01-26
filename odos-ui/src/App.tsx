import "./App.css";
import { Link, Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Footer, Graph, Header } from "./components";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import data from "./resources/sample";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
        </Routes>
      </Router>

      <Footer />
    </div>
  );
}

function Home() {

  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <Graph data={data} />
      </main>
      <nav>
        <Link to="/about">About</Link>
      </nav>
    </>
  );
}

function About() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>That feels like an existential question, don't you think?</p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}

export default App;
