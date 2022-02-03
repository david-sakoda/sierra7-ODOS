import {
  AppBar,
  Avatar,
  Box,
  Container,
  Divider,
  getListItemSecondaryActionClassesUtilityClass,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { UserContext } from "../App";
import { doLogout } from "../keycloak";


// const pages = [{title: "Search", route: "/"}, {title: "Visualization", route: "/visualize"}];
const settings = [{ title: "Logout", action: () => doLogout() }];
const appTitle = "RetroPaper Movie Spider";
export const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const user = useContext(UserContext);

  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getInitials= () =>{
    return user?.name.charAt(0)+user?.family_name.charAt(0) || ""
  }
  console.log(user);
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: "flex",
              color: "white",
              textDecoration: "none",
            }}
          >
            {appTitle}
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} >
                {user && user.name && user.avatar ? <Avatar alt={user?.name} src={process.env.PUBLIC_URL + `/images/${user.avatar}`} sx={{height: 50, width: 50,}}/> :<Avatar alt={user?.name} sx={{height: 50, width: 50,}}>{getInitials()}</Avatar> }
                <Typography variant="body1" sx={{paddingLeft: 1, color: "white"}}>{user?.name}</Typography>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuList>
              <p style={{padding: "0px 16px"}}>Role: {user?.resource_access["odos-ui"].roles[0]}</p>
              <Divider />
              {settings.map((setting) => (
                <MenuItem key={setting.title} onClick={setting.action}>
                  <Typography textAlign="center">{setting.title}</Typography>
                </MenuItem>
              ))}
              </MenuList>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
