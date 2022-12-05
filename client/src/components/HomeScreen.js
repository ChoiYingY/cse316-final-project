import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import TextField from '@mui/material/TextField';
import SortIcon from '@mui/icons-material/Sort';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'

// import AddIcon from '@mui/icons-material/Add';

import AuthContext from '../auth'
import { useHistory } from 'react-router-dom';

// const btnHoverSx = {
//     cursor: 'pointer',
//     margin: "0.5%",
//     padding: "1%",
//     borderRadius: "5%",
//     '&:hover':{
//         backgroundColor: 'rgba(255,255,255,0.3)',
//     }
// };

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    
    const history = useHistory();

    console.log("HomeScreen auth.loggedIn: " + auth.loggedIn);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    return (
        <div id="playlist-selector">
            <Box>
                <AppBar position="static">
                    <Toolbar sx={{  backgroundColor: "lightGray" }}>
                    
                        <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <div item id="container">
                                <Box
                                    aria-label="home" id="home-button"
                                    sx={{ cursor: 'pointer'}}
                                    onClick={ () => {   console.log("jump to home screen");  history.push("/"); } }
                                >
                                    <HomeOutlinedIcon
                                        size="large"
                                        fontSize="large"
                                        edge="end"
                                        aria-label="Home Button"
                                        aria-haspopup="true"
                                        sx={{  color: "black"   }}
                                    />
                                </Box>

                                <Box
                                    aria-label="all list" id="all-list-button"
                                    sx={{ cursor: 'pointer'}}
                                    onClick={ () => {   console.log("jump to all lists screen");  } }
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
                                    onClick={ () => {   console.log("jump to users screen");  } }
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
                                item
                                sx={{   backgroundColor:"white", width: "60%"}}
                                placeholder="Search"
                                inputProps={{
                                    style: {
                                    fontSize: 15,
                                    height: 45,
                                    width: 272,
                                    padding: '0 14px'
                                }}}
                            />

                            <Box
                                // sx={ btnHoverSx }
                                // onClick={ () => {   console.log("sort by");  } }
                                item
                            >
                                <Grid
                                    container
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <Typography item color="black">SORT BY</Typography>
                                    </Grid>
                                    
                                    <Grid item xs={3}>
                                        <Box
                                            aria-label="sort" id="sort-button"
                                            sx={{ cursor: 'pointer'}}
                                            onClick={ () => {   console.log("Choose a sorting");  } }
                                        >
                                            <SortIcon
                                                item
                                                size="large"
                                                fontSize="large"
                                                edge="end"
                                                aria-label="Sorting Button"
                                                aria-haspopup="true"
                                                sx={{  color: "black"}}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>

                    </Toolbar>
                </AppBar>
            </Box>
            {/* <div id="list-selector-heading">
            <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
                disabled={store.isModalOpen() || store.listNameActive}
            >
                <AddIcon />
            </Fab>
                <Typography variant="h2">Your Lists</Typography>
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
                <MUIDeleteModal />
            </div> */}
        </div>)
}

export default HomeScreen;