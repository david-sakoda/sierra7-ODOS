import Keycloak from "keycloak-js";
import { config as conf } from "./config";
const config = {
  url: conf.keycloak.URL,
  realm: "odos",
  clientId: "odos-ui",
};

const keycloak = new Keycloak(config);

export default keycloak;
