import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Copyright from './Copyright';
import { useHistory } from 'react-router-dom';

import { GlobalStoreContext } from '../store';
import AuthContext from '../auth'
import { useContext } from 'react';

const headingStyle = {
    fontSize: "1.125em",
    marginTop: "1.5%",
}

const btnStyle = {
    color: "white",
    border: '1.5px solid #ffffff',
    boxShadow: 24,
    margin: "2%",
    padding: "1.125%",
};

const btnHoverSx = {
    '&.MuiButton-root:hover':{
        backgroundColor: '#9baddb',
    }
};

export default function SplashScreen() {
    const history = useHistory();
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    return (
        <div id="splash-screen">
            <Typography                        
                variant="h2"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' } }}
                style = {headingStyle}
            >
                Welcome!
            </Typography>

            <Box
                component="img"
                alt="Playlister_logo"
                src="/assets/playlister_logo.png"
                width={"45%"}
            />

            <Typography                        
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' } }}
            >
                Create, play & share<br/>
                your own YouTube<br/>
                music playlist.
            </Typography>

            <Button
                variant="outlined"
                style={btnStyle} sx={btnHoverSx}
                onClick={
                    () => history.push("/register/")
                }
            >
                Create Account
            </Button>

            <Button
                variant="outlined"  style={btnStyle} sx={btnHoverSx}
                onClick={
                    () => history.push("/login/")
                }
            >
                Login
            </Button>

            <Button variant="outlined"
                style={btnStyle} sx={btnHoverSx}
                onClick={() => {
                        console.log("You're a guest");
                        store.setCurrentView("ALL_LISTS");
                        auth.continueAsGuest();
                        history.push("/");
                    }
                }
            >
                Continue as Guest
            </Button>

            <Copyright sx={{ mt: 5 }} style={ { marginTop: "1%", color: "white" }}/>
        </div>
    )
}