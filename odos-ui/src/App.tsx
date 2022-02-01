import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import { ReactKeycloakProvider } from "@react-keycloak/web";
import {
  Dossier,
  Footer,
  Header,
  PrivateRoute,
  Search,
  Visualization,
} from "./components";
import keycloak from "./keycloak";

import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={{ onLoad: "login-required" }}
      >
        <QueryClientProvider client={queryClient}>
          <Router>
            <Header />
            <main>
              <Routes>
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Search />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="dossier/:id"
                  element={
                    <PrivateRoute>
                      <Dossier />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="visualize"
                  element={
                    <PrivateRoute>
                      <Visualization />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </main>
          </Router>
          <Footer />
        </QueryClientProvider>
      </ReactKeycloakProvider>
    </div>
  );
}

export default App;
