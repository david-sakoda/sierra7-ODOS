import "./App.css";
import { Link, Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Dendogram, Footer, Graph, Header } from "./components";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import data from "./resources/sample";
import { useEffect } from "react";
import { SampleData } from "./components/shared/Dendogram";
import { Button } from "@mui/material";
import styled from "@emotion/styled";

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
const D3Container = styled.div`
height: calc(100% / 2);
width: 100vw;
.link {
  fill: none;
  stroke: #ccc;
  stroke-width: 1.5px;
}

`
function Home() {
  
  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <Button onClick={()=>Dendogram({height: 800, width:800, data: SampleData})}>Load D3</Button>
        <D3Container id="d3-container">
          
        </D3Container>
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
