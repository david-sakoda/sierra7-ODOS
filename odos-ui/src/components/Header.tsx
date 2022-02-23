import {
  AppBar,
  Avatar,
  Box,
  Container,
  Divider, IconButton,
  Menu,
  MenuItem,
  MenuList,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";


export const Header = () => {
  const { keycloak } = useKeycloak(); 
  // const pages = [{title: "Search", route: "/"}, {title: "Visualization", route: "/visualize"}];
  const settings = [{ title: "Logout", action: () => keycloak.logout() }];
  const appTitle = "RetroPaper Movie Spider";
  const [anchorElUser, setAnchorElUser] = useState(null);
  const user = keycloak.idTokenParsed || {};

  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getInitials= () =>{
    if(user.name && user.family_name)
    return user.name.charAt(0)+user.family_name.charAt(0) || ""
    else return "";
  }
  
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
                {user && user.name && user.avatar ? <Avatar alt={user?.name} src={ `/images/${user.avatar}`} sx={{height: 50, width: 50,}}/> :<Avatar alt={user?.name} sx={{height: 50, width: 50,}}>{getInitials()}</Avatar> }
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
              {user.resource_access && <p style={{padding: "0px 16px"}}>Role: {user.resource_access["odos-ui"].roles[0]}</p>}
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
  ) 

};
