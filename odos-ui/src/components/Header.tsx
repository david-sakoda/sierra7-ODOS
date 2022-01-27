import { Link } from "@mui/material";
import { doLogout } from "../keycloak";


export const Header = () => {

  return (
    <header className="App-header">
      <div>
        <Link href="#" onClick={()=> doLogout()}>Logout</Link>
      </div>
    </header>
  );
};
