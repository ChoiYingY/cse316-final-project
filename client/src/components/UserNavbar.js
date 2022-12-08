import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import TextField from '@mui/material/TextField';
import SortIcon from '@mui/icons-material/Sort';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'

import { useHistory } from 'react-router-dom';
import { useContext, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';


export default function UserNavbar() {
    const history = useHistory();
    const [input, setInput] = useState("");
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    const classes = makeStyles(iconStyles)();


    console.log("Is user a guest? " + auth.isGuest);

    function handleKeyPress(event){
        console.log("You have pressed on key");
        if (event.code === "Enter") {
            console.log("You have pressed enter.");

            let searchInput = input;
            store.saveAndSearchInput(searchInput);
        }
    }

    function handleUpdateText(event){
        console.log(event.target.value);
        setInput(event.target.value);
    }

    function iconStyles() {
        return {
          enabledIcon: {
            color: 'black',
          },
          disabledIcon: {
            color: 'gray',
          },
        }
      }

      const homeBtn = (!auth.isGuest)
      ? <HomeOutlinedIcon
        size="large" fontSize="large" edge="end" aria-label="Home Button" aria-haspopup="true"
        className={classes.enabledIcon}
        onClick={(event) => {
            console.log("jump to home screen");
            event.stopPropagation();
            store.setCurrentView("HOME");
            history.push("/");
        } } />
        : <HomeOutlinedIcon
            size="large" fontSize="large" edge="end" aria-label="Home Button" aria-haspopup="true"
            className={classes.disabledIcon}
            onClick={(event) => {
                console.log("jump to home screen");
                event.stopPropagation();
                store.setCurrentView("HOME");
                history.push("/");
            } } />;


    const btnSx = {
        minWidth: "45px",
        padding: "5%",
        borderStyle: "none",
        borderRadius: "5%",
        '&:disabled':{
            borderStyle: "none",
        },
        '&:selected':{
            backgroundColor: "black",
        }
    }

    return (
        <Box>
            <AppBar position="static">
                <Toolbar sx={{  backgroundColor: "lightGray" }}>
                
                    <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <ToggleButtonGroup
                            className="container"
                            sx={{
                                cursor: 'pointer',
                                display: "flex",
                                justifyContent:"space-between",
                                alignItems:"center"
                            }}
                            exclusive
                        >
                            <ToggleButton
                                aria-label="home" id="home-button" value="HOME"
                                sx={btnSx}
                                disabled = {auth.isGuest}
                                selected = { !auth.isGuest && store.currentView === "HOME"}
                            >
                                {homeBtn}
                            </ToggleButton>

                            <ToggleButton
                                aria-label="all list" id="all-list-button" value="ALL_LISTS"
                                sx={btnSx}
                                selected = { store.currentView === "ALL_LISTS"}
                                onClick={ (event) => {
                                    console.log("jump to all lists screen");
                                    event.stopPropagation();
                                    store.setCurrentView("ALL_LISTS");
                                    history.push("/");
                                } }
                            >
                                <GroupsOutlinedIcon
                                    size="large"
                                    fontSize="large"
                                    edge="end"
                                    aria-label="All Lists Button"
                                    aria-haspopup="true"
                                    sx={{  color: "black"   }}
                                />
                            </ToggleButton>

                            <ToggleButton
                                aria-label="users" id="users-button" value="USERS"
                                sx={btnSx}
                                selected = { store.currentView === "USERS"}
                                onClick={ (event) => {
                                    console.log("jump to users screen");
                                    event.stopPropagation();
                                    store.setCurrentView("USERS");
                                    history.push("/");
                                } }
                            >
                                <PersonOutlineOutlinedIcon
                                    size="large"
                                    fontSize="large"
                                    edge="end"
                                    aria-label="Users Button"
                                    aria-haspopup="true"
                                    sx={{  color: "black"   }}
                                />
                            </ToggleButton>
                        </ToggleButtonGroup>

                        <TextField
                            sx={{   backgroundColor:"white", width: "60%"}}
                            placeholder="Search"
                            inputProps={{
                                style: {
                                fontSize: 15,
                                height: 45,
                                width: 275,
                                padding: '0 14px'
                            }}}
                            onKeyPress={handleKeyPress}
                            value={input}
                            onChange={handleUpdateText}
                        />

                        <Box
                            // sx={ btnHoverSx }
                            // onClick={ () => {   console.log("sort by");  } }
                        >
                            <div className='container' style={{"width": "150px", justifyContent:"flex-end"}}>
                                <Typography color="black" fontFamily="Lexend Exa">SORT BY</Typography>
                                
                                <div>
                                    <Box
                                        aria-label="sort" id="sort-button"
                                        sx={{ cursor: 'pointer'}}
                                        onClick={
                                            (event) => {
                                                console.log("Choose a sorting");
                                                event.stopPropagation();
                                            } }
                                    >
                                        <SortIcon
                                            size="large"
                                            fontSize="large"
                                            edge="end"
                                            aria-label="Sorting Button"
                                            aria-haspopup="true"
                                            sx={{  color: "black"}}
                                        />
                                    </Box>
                                </div>
                            </div>
                        </Box>
                    </Grid>

                </Toolbar>
            </AppBar>
        </Box>
    );
}