import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Copyright from './Copyright'

const headingStyle = {
    fontSize: "1.125em",
    marginTop: "1.5%",
}

const btnStyle = {
    color: "white",
    border: '1px solid #ffffff',
    boxShadow: 24,
    margin: "2.5%",
    padding: "1%",
};

export default function SplashScreen() {
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
                src="assets/playlister_logo.png"
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

            <Button variant="outlined"  style={btnStyle}>
                Create Account
            </Button>

            <Button variant="outlined"  style={btnStyle}>
                Login
            </Button>

            <Button variant="outlined"  style={btnStyle}>
                Continue as Guest
            </Button>

            <Copyright sx={{ mt: 5 }} style={ { marginTop: "1%" }}/>
        </div>
    )
}