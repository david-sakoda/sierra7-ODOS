import Keycloak from "keycloak-js";
import { config as conf } from "./config";
const config = {
  url: conf.keycloak.URL,
  realm: "odos",
  clientId: "odos-ui",
};

const keycloak = new Keycloak(config);

export const doLogout = () => {
  keycloak.logout();

};

export const doLogin = () => {
  keycloak.login();
}
export const getTokenParsed = () => keycloak.tokenParsed? keycloak.tokenParsed: null;
export const getToken = () => keycloak.token;
export const getUsername = () => keycloak.tokenParsed?.preferred_username;
export const hasRole = (roles) =>
  roles.some((role) => keycloak.hasRealmRole(role));

export default keycloak;
