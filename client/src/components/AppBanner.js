import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store';

// import EditToolbar from './EditToolbar';

import Avatar from '@mui/material/Avatar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';

import Grid from '@mui/material/Grid';

import { useHistory } from 'react-router-dom';

export default function AppBanner() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        auth.logoutUser();
        store.clearTransactions();
        console.log("NOW WE HAVE LOGGED OUT");
    }

    const menuId = 'primary-search-account-menu';
    const loggedOutMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}><Link to='/register/'>Create New Account</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link to='/login/'>Login</Link></MenuItem>
        </Menu>
    );
    const loggedInMenu = 
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>        

    // let editToolbar = "";
    let menu = loggedOutMenu;
    if (auth.loggedIn) {
        menu = loggedInMenu;
        // if (store.currentList) {
        //     editToolbar = <EditToolbar />;
        // }
    }
    
    function getAccountMenu(loggedIn) {
        let userInitials = auth.getUserInitials();
        console.log("userInitials: " + userInitials);
        if (loggedIn)
            return <div id="initialIcon"><Avatar sx={{ color:"white", backgroundColor:"#b91e1e", border: '1.5px solid #b91e1e', padding: "2px 2px 0px 1px" }}>{userInitials}</Avatar></div>;
        else
            return <AccountCircle />;
    }

    const userLoggedIn = auth.user !== null && auth.loggedIn !== false;
    const shouldDisable = store.isModalOpen() || store.listNameActive || auth.errMsg !== null;
    console.log(!userLoggedIn && auth.errMsg !== null);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{  backgroundColor: "#BABFEE"  }}>
                    <Grid container sx={{ display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                        <Grid item>
                            <Link to="/">
                                <Box
                                    component="img"
                                    alt="Playlister_logo"
                                    src="/assets/playlister_logo.png"
                                    width={"28.5%"}
                                    onClick={ () => {
                                        if(auth.loggedIn){
                                            console.log("HOME");
                                            store.setCurrentView("HOME");
                                            history.push("/");
                                        }
                                    }}
                                />
                            </Link>
                        </Grid>
                        
                        <Grid item>
                            <Box sx={{ display: { xs: 'none', md: 'flex'} }}>
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                    disabled={shouldDisable}
                                >
                                    { getAccountMenu(auth.loggedIn) }
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>        
                </Toolbar>
            </AppBar>
            {
                menu
            }
        </Box>
    );
}