import { Button } from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

type RouteProps = {
  children: any;
  role?: string;
};

export const PrivateRoute: FunctionComponent<RouteProps> = ({
  children,
  role,
}) => {
  const { keycloak } = useKeycloak();
    const navigate = useNavigate();
  const isLoggedIn = keycloak.authenticated;

  //Default authorized if also authenticated for normal users
  let authorized = true;

  const keycloakRoles =
    keycloak.idTokenParsed && keycloak.idTokenParsed.resource_access
      ? keycloak.idTokenParsed.resource_access["odos-ui"]?.roles
      : null;

  if (role && !keycloakRoles) {
    // If route requires a role, but user doesn't have any roles
    authorized = false;
  } else if (role && keycloakRoles && keycloakRoles.length > 0) {
    // If route requires a role, the user has a role, so check if they match
    if (!keycloakRoles.includes(role)) {
      authorized = false;
    }
  }

  if (isLoggedIn && authorized) {
    return children;
  } else if (isLoggedIn && !authorized) {
    return (
      <div style={{display:"flex", flexDirection: "column"}}>
        <span>You are not authorized to view this content</span>
        <Button variant="text" onClick={() => navigate(`/`)}>Return to Home</Button>
      </div>
    );
  } else {
    return <div />;
  }
};
