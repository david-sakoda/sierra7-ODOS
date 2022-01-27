import Keycloak from "keycloak-js";

const config = {
    url: "http://localhost:8080/auth",
    realm: "odos",
    clientId: "odos-ui",
}   

const keycloak = new Keycloak(config);

export default keycloak;