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

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { GlobalStoreContext } from '../store';
import AuthContext from '../auth';

import { useHistory } from 'react-router-dom';
import { useContext, useState } from 'react';

import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';


export default function UserNavbar() {
    const history = useHistory();
    const [input, setInput] = useState("");
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    const classes = makeStyles(iconStyles)();

    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const openMenu = (event) => {
        console.log("Choose a sorting");
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorEl(null);
    };

    const handleSortAtoZ = (event) => {
        store.setSortBy("ATOZ");
        console.log("Changing to ATOZ");
        closeMenu();
    }

    const handleSortPublishDate = (event) => {
        store.setSortBy("PUBLISH_DATE");
        console.log("Changing to PUBLISH_DATE");
        closeMenu();
    }

    const handleSortListens = (event) => {
        store.setSortBy("LISTENS");
        console.log("Changing to LISTENS");
        closeMenu();
    }

    const handleSortLikes = (event) => {
        store.setSortBy("LIKES");
        console.log("Changing to LIKES");
        closeMenu();
    }

    const handleSortDislikes = (event) => {
        store.setSortBy("DISLIKES");
        console.log("Changing to DISLIKES");
        closeMenu();
    }

    const menuId = 'sorting-menu';
    const sortingMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top',  horizontal: 'right', }}
            open={isMenuOpen}
            onClose={closeMenu}
        >
            <MenuItem onClick={handleSortAtoZ}><Link to='/'>Name (A-Z)</Link></MenuItem>
            <MenuItem onClick={handleSortPublishDate}><Link to='/'>Publish Date (Newest)</Link></MenuItem>
            <MenuItem onClick={handleSortListens}><Link to='/'>Listens (High - low)</Link></MenuItem>
            <MenuItem onClick={handleSortLikes}><Link to='/'>Likes (High - low)</Link></MenuItem>
            <MenuItem onClick={handleSortDislikes}><Link to='/'>Dislikes (High - low)</Link></MenuItem>
        </Menu>
    );

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
            setInput("");
            store.setCurrentView("HOME");
            history.push("/");
        } } />
        : <HomeOutlinedIcon
            size="large" fontSize="large" edge="end" aria-label="Home Button" aria-haspopup="true"
            className={classes.disabledIcon}/>;


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
                                    setInput("");
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
                                    setInput("");
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

                        <Box>
                            <div className='container' style={{"width": "150px", justifyContent:"flex-end"}}>
                                <Typography color="black" fontFamily="Lexend Exa">SORT BY</Typography>
                                <div>
                                    <Box
                                        aria-label="sort" id="sort-button"
                                        sx={{ cursor: 'pointer'}}
                                    >
                                        <SortIcon
                                            size="large"
                                            fontSize="large"
                                            edge="end"
                                            aria-label="Sorting Button"
                                            aria-haspopup="true"
                                            sx={{  color: "black" }}
                                            onClick={openMenu}
                                        />
                                        {sortingMenu}
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