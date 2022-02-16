import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import {
  Dossier,
  Header,
  PrivateRoute,
  Search,
  Visualization
} from "@/components";
import keycloak from "@/keycloak";

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
                        <Visualization width='400' height='300' />
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </main>
            </Router>
          </QueryClientProvider>
      </ReactKeycloakProvider>
    </div>
  );
}

export default App;
