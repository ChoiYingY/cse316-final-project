import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import TextField from '@mui/material/TextField';
import SortIcon from '@mui/icons-material/Sort';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom';
import { useContext, useState } from 'react'

export default function UserNavbar() {
    const history = useHistory();
    const [input, setInput] = useState("");
    const { store } = useContext(GlobalStoreContext);
    

    function handleKeyPress(event){
        console.log("You have pressed on key");
        if (event.code === "Enter") {
            console.log("You have pressed enter.");
            // store.changeListName(id, text);
            // toggleEdit();
        }
    }

    function handleUpdateText(event){
        console.log(event.target.value);
        setInput(event.target.value);
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
                        <div className="container">
                            <Box
                                aria-label="home" id="home-button"
                                sx={{ cursor: 'pointer'}}

                            >
                                <HomeOutlinedIcon
                                    size="large"
                                    fontSize="large"
                                    edge="end"
                                    aria-label="Home Button"
                                    aria-haspopup="true"
                                    sx={{  color: "black"   }}
                                    onClick={() => {
                                        console.log("jump to home screen");
                                        store.setCurrentView("HOME");
                                        history.push("/");
                                    } }
                                />
                            </Box>

                            <Box
                                aria-label="all list" id="all-list-button"
                                sx={{ cursor: 'pointer'}}
                                onClick={ () => {
                                    console.log("jump to all lists screen");
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
                            </Box>

                            <Box
                                aria-label="users" id="users-button"
                                sx={{ cursor: 'pointer'}}
                                onClick={ () => {
                                    console.log("jump to users screen");
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
                            </Box>
                        </div>

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
                            onChange={handleUpdateText}
                        />

                        <Box
                            // sx={ btnHoverSx }
                            // onClick={ () => {   console.log("sort by");  } }
                        >
                            <div className='container' style={{"width": "150px", justifyContent:"flex-end"}}>
                                <Typography color="black">SORT BY</Typography>
                                
                                <div>
                                    <Box
                                        aria-label="sort" id="sort-button"
                                        sx={{ cursor: 'pointer'}}
                                        onClick={ () => {   console.log("Choose a sorting");  } }
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