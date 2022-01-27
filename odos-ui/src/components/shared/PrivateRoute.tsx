import { useKeycloak } from "@react-keycloak/web";
import { FunctionComponent } from "react";

type RouteProps = {
    children: any
}


export const PrivateRoute : FunctionComponent<RouteProps> = ({ children }) => {
 const { keycloak } = useKeycloak();

 const isLoggedIn = keycloak.authenticated;
    
 return isLoggedIn ? children : null;
};

