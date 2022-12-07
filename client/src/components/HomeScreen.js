import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import UserNavbar from './UserNavbar'

import { useHistory } from 'react-router-dom'

import List from '@mui/material/List';
import Box from '@mui/material/Box';

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';

import AuthContext from '../auth';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import PlaylisterYouTubePlayer from './PlaylisterYouTubePlayer.js';
import TextField from '@mui/material/TextField';

import CommentCard from './CommentCard.js';

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

    const history = useHistory();
    const [text, setText] = useState("");
    // const [input, setInput] = useState("");

    console.log("HomeScreen auth.loggedIn: " + auth.loggedIn);
    console.log(store);

    if(store.publishedPlaylist)
        console.log("store.publishedPlaylist: " + JSON.stringify(store.publishedPlaylist) + "\nIt has length of " + store.publishedPlaylist.length);


    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList(event) {
        event.stopPropagation();
        store.createNewList();
    }

    let bottomBar = "";
    let listCard = "";

    if (store && store.currentView) {
        switch(store.currentView){
            case "HOME":{
                console.log("IN HOME VIEW");
                console.log(store.idNamePairs);

                bottomBar = <>
                    <Fab
                        aria-label="add"
                        id="add-list-button"
                        onClick={handleCreateNewList}
                        sx={fabBtnSx}
                    >
                        <AddIcon />
                    </Fab>
                    <Typography variant="h3" fontFamily="Lexend Exa">Your Lists</Typography>
                </>;
                
                listCard = store.idNamePairs.map((pair) => (
                    <ListCard
                        id={pair._id}
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                        isPublished={pair.isPublished}
                        list={ pair.list }
                    />
                ))
                break;
            }
            case "ALL_LISTS":{
                console.log("IN ALL_LISTS VIEW");
                console.log(store.publishedPlaylist);


                bottomBar = <>
                    <Typography variant="h3" fontFamily="Lexend Exa">Playlists</Typography>
                </>;

                listCard = store.publishedPlaylist.map((pair) => (
                    <ListCard
                        id={pair._id}
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                        isPublished={pair.isPublished}
                        list={ pair.list }
                    />
                ))
                break;
            }
            case "USERS":{
                console.log("IN USERS VIEW");
                // arrList = store.idNamePairs;
                // console.log(arrList);
                break;
            }
        }
    }

    let currPlayer = {
        list: null,
        listName: null,
        songQueue: null,
        song: null
    }

    if(store.foundList){
        currPlayer.list = store.foundList;
        currPlayer.listName = store.foundList.name;
        currPlayer.songQueue = store.foundList.songs;
        if(currPlayer.songQueue.length > 0)
            currPlayer.song = currPlayer.songQueue[0];
    }

    const playerBtnSx = {
        background:"white",
        fontFamily: "Lexend Exa",
        borderRadius: "7.5% 7.5% 2% 2%",
        marginTop: "1%",
        padding: "1.5% 5%",
        '&:hover':{
            backgroundColor: "white",
            color: '#b91e1e',
        }
    }

    function handleUpdateText(event) {
        event.stopPropagation();
        setText(event.target.value);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            event.stopPropagation();

            console.log()
            store.postComment(auth.user.userName, text);
            setText("");
        }
    }

    let tab = "";
    let comments = "";
    let commentSection = "";

    if(store.foundList && store.foundList.isPublished){
        comments = store.foundList.comments.map((comment) => (
                    <CommentCard
                        id={comment._id}
                        key={comment._id}
                        commenter={comment.commenter}
                        text={comment.text}
                    />
                ))

        commentSection = <TextField
                margin="normal"
                name="name"
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                placeholder="Add Comment"
                value = {text}
                sx={{backgroundColor:"white", width: "95%"}}
            />
        
    }

    if(store.playerCommView === "PLAYER"){
        tab = <Grid sx={{width:"100%"}}>
            <PlaylisterYouTubePlayer currPlayer={currPlayer}/>
        </Grid>;
    }
    else if(store.playerCommView === "COMMENTS"){
        tab = <Grid sx={{width:"100%", display:"flex", justifyContent:"flex-start" , flexDirection:"column", alignItems:"center" }}>
            <Grid
                sx ={{ width:"100%", height:"410px", backgroundColor: "purple", display:"flex", justifyContent:"space-between" , flexDirection:"column", alignItems:"center"}}
            >   
                <Grid sx={{width: "100%",  display:"flex", justifyContent:"flex-start",  overflowY: "scroll" , flexDirection:"column", alignItems:"center" }}>
                    {    comments   }
                </Grid>
                <Grid  sx={{width: "100%",  display:"flex", justifyContent:"flex-start" , flexDirection:"column", alignItems:"center" }}>
                    {    commentSection   }
                </Grid>
            </Grid>
            
        </Grid>;
    }

    console.log(store.foundList);
    
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
                            <Grid sx={{width:"60%", height: "450px" , backgroundColor:"red", overflowY: "scroll"}}>
                                <Grid>
                                    <div id="list-selector-list">
                                        {
                                            listCard
                                        }
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid sx={{width:"40%", height: "450px" , backgroundColor:"blue"}}>
                                <div sx={{width:"100%", display:"flex", flexDirection: "column", justifyContent:"flex-start"}}>
                                    <Button
                                        outline="filled" sx={playerBtnSx}
                                        onClick={(event) => {
                                            console.log("jump to PLAYER tab");
                                            event.stopPropagation();
                                            store.setPlayerCommentView("PLAYER");
                                            history.push("/");
                                        }}
                                    >
                                        Player
                                    </Button>

                                    <Button
                                        outline="filled" sx={playerBtnSx}
                                        onClick={(event) => {
                                            console.log("jump to COMMENTS tab");
                                            event.stopPropagation();
                                            store.setPlayerCommentView("COMMENTS");
                                            history.push("/");
                                        }}
                                    >
                                        Comments
                                    </Button>
                                </div>
                                
                                {tab}
                                
                            </Grid>
                        </div>
                        
                    </Grid>
                

                <Grid id="add-list" item  sx={{bottom:"0%", position:"absolute"}}>
                    {bottomBar}
                </Grid>

            </Grid>
        </div>
    )
}

export default HomeScreen;