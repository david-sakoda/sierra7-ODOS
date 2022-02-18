import Keycloak from "keycloak-js";

const config = {
  url: import.meta.env.VITE_AUTH_URL,
  realm: "odos",
  clientId: "odos-ui",
};

const keycloak = new Keycloak(config);

export default keycloak;
