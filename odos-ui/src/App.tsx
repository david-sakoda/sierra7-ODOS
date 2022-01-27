import "./App.css";
import { Link, Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Dendogram, Footer, Graph, Header, PrivateRoute } from "./components";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";


import { useEffect } from "react";
import { SampleData } from "./components/shared/Dendogram";

import styled from "@emotion/styled";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak"

function App() {
  return (
    <div className="App">
      <ReactKeycloakProvider authClient={keycloak} initOptions={{ onLoad: 'login-required' }}>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="about" element={<About />} />
        </Routes>
      </Router>

      <Footer />
      </ReactKeycloakProvider>
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
  useEffect(()=> Dendogram({height:800, width: 800, data:SampleData}))
  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        
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
