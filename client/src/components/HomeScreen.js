import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import UserNavbar from './UserNavbar'

import List from '@mui/material/List';
import Box from '@mui/material/Box';

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';

import AuthContext from '../auth';
import Grid from '@mui/material/Grid';

// const btnHoverSx = {
//     cursor: 'pointer',
//     margin: "0.5%",
//     padding: "1%",
//     borderRadius: "5%",
//     '&:hover':{
//         backgroundColor: 'rgba(255,255,255,0.3)',
//     }
// };

const fabBtnSx = {
    marginRight: "2.5%",
    backgroundColor: "#b91e1e",
    color: "white",
    '&:hover':{
        backgroundColor: "white",
        color: '#b91e1e',
    }
};

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    console.log("HomeScreen auth.loggedIn: " + auth.loggedIn);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }

    let addList = "";
    if(store.currentView == "HOME"){
            addList = <>
                <Fab
                    aria-label="add"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                    sx={fabBtnSx}
                >
                    <AddIcon />
                </Fab>
                <Typography variant="h2">Your Lists</Typography>
            </>;
    }

    let listCard = "";
    if (store && store.currentView) {
        switch(store.currentView){
            case "HOME":{
                console.log("IN HOME VIEW");
                console.log(store.idNamePairs);
                
                listCard = store.idNamePairs.map((pair) => (
                    <ListCard
                        id={pair._id}
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
                break;
            }
            case "ALL_LISTS":{
                console.log("IN ALL_LISTS VIEW");
                // console.log(arrList);
                break;
            }
            case "USERS":{
                console.log("IN USERS VIEW");
                // arrList = store.idNamePairs;
                // console.log(arrList);
                break;
            }
        }

        // listCard = 
            // <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
            // {
                // store.idNamePairs.map((pair) => 
                // {
                //     console.log(pair);
                //     store.findPlaylistById(pair._id);
                //     // console.log(store.currentList);
                //     return (
                //         <ListCard
                //             key={pair._id}
                //             idNamePair={pair}
                //             selected={false}
                //         />
                //     );
                //     }
                // )
            // }
            // </List>;
    }
    return (
        <div>
            <UserNavbar/>
        
            <Grid
                id="playlist-grid" container
            >
                    <Grid
                        sx={{width:"100%", height: "100%" , backgroundColor:"gray"}}
                    >
                        <div
                            id="playlist-selector"
                        >
                            <Grid sx={{width:"60%", height: "100%" , backgroundColor:"red", overflowY: "scroll"}}>
                                <Grid>
                                    <div id="list-selector-list">
                                        {
                                            listCard
                                        }
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid sx={{width:"40%", height: "100%" , backgroundColor:"blue"}}>
                                hi
                            </Grid>
                        </div>
                        
                    </Grid>
                

                <Grid id="add-list" item>
                    {addList}
                </Grid>

            </Grid>
        </div>
    )
}

export default HomeScreen;