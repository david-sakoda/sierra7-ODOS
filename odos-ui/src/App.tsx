import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ReactKeycloakProvider } from "@react-keycloak/web";

import { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import jwt_decode, { JwtPayload } from "jwt-decode";
import "./App.css";
import {
  Dossier,
  Header,
  PrivateRoute,
  Search,
  Visualization,
} from "./components";
import keycloak from "./keycloak";

type KeycloakDecoded = {
  email: string;
  family_name: string;
  given_name: string;
  name: string;
  preferred_username: string;
  avatar?: string;
  resource_access: { "odos-ui": { roles: string[] } };
};

export const UserContext = createContext<KeycloakDecoded>({
  email: "",
  family_name: "",
  given_name: "",
  name: "",
  preferred_username: "",
  resource_access: {
    "odos-ui": {
      roles: [""],
    },
  },
});

function App() {
  const queryClient = new QueryClient();
  const [user, setUser] = useState<any>();
  return (
    <div className="App">
      <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={{ onLoad: "login-required" }}
        onTokens={(t) => {
          if (t.token) setUser(jwt_decode(t.token));
        }}
      >
        <UserContext.Provider value={user}>
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
          </QueryClientProvider>
        </UserContext.Provider>
      </ReactKeycloakProvider>
    </div>
  );
}

export default App;
