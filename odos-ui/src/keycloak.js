import Keycloak from "keycloak-js";

const config = {
  url: "http://localhost:8080/auth",
  realm: "odos",
  clientId: "odos-ui",
};

const keycloak = new Keycloak(config);

export const doLogout = () => {
  keycloak.logout();
};
export const getToken = () => keycloak.token;
export const getUsername = () => keycloak.tokenParsed?.preferred_username;
export const hasRole = (roles) =>
  roles.some((role) => keycloak.hasRealmRole(role));

export default keycloak;
