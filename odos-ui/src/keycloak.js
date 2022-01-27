import Keycloak from "keycloak-js";

const config = {
    url: "http://localhost:8080/auth",
    realm: "odos",
    clientId: "odos-ui",
}   

const keycloak = new Keycloak(config);

export const doLogout = ()=> {keycloak.logout()}

export default keycloak;