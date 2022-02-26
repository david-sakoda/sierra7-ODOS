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
  UpsertMovie,
  Visualization
} from "@/components";
import keycloak from "@/keycloak";
import { AnimatePresence } from "framer-motion";

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
                      path="dossier/:id/edit"
                      element={
                        <PrivateRoute role="SUPERVISOR">
                          <UpsertMovie type="edit" />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="add"
                      element={
                        <PrivateRoute role="SUPERVISOR">
                          <UpsertMovie type="add" />
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
                        <Visualization/>
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
