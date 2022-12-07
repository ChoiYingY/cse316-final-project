import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';

import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import MUIDeleteModal from './MUIDeleteModal';
import RenamePlaylistErrorModal from './RenamePlaylistErrorModal';
import SongCard from './SongCard.js';

import KeyboardDoubleArrowDownOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowDownOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

/*
//     This is a card in our list of top 5 lists. It lets select
//     a list for editing and it has controls for changing its 
//     name or deleting it.
    
//     @author McKilla Gorilla
// */

const addSongBtnSx = {
    backgroundColor: "#414397",
    width:"95%",
    margin: "2.5% auto",
    padding: "2%",
    '&:hover':{
        backgroundColor: "#2d2e79"
    }
};

const btnSx = {
    cursor: 'pointer',
    margin: "1.5% 0% ",
    borderRadius: "10%",
    padding: "2% 2%",
    width: "50px",
    fontSize: '10px',
    backgroundColor: "#b91e1e",
    '&:hover':{
        backgroundColor: "#881313"
    }
};

const ExpandBtn = styled((props) => {
    const { expand, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }
    ),
}));

function ListCard(props) {    
    console.log(props);

    const { idNamePair, selected, isPublished, list} = props;

    console.log(`selected: ${selected}`);
    console.log(`idNamePair: ${JSON.stringify(idNamePair)}`);
    console.log(`isPublished: ${isPublished}`);
    console.log(`list: ${list}`);

    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const [expand, setExpand] = useState(false);
    const [published, setPublished] = useState((isPublished) ? true : false);

    console.log(store);


    function handleAddSong(event){
        console.log("add song");
        event.stopPropagation();
        let song = { title: "Untitled", artist: "Unknown", youTubeId: "dQw4w9WgXcQ" };
        store.addNewSong(idNamePair._id, store.getPlaylistSize(), song);
    }

    function handleDeleteList(event) {
        console.log("Delete list");
        event.stopPropagation();
        store.markListForDeletion(idNamePair._id);
    }

    function toggleEdit() {
        console.log(editActive);
        if(!list)
            return;
        let newActive = !editActive;
        if (newActive) {
            console.log("HIHIHIHIHIHIHIHIIH");
            console.log(list);
            store.setIsListNameEditActive();
            console.log(list);
        }
        setEditActive(newActive);
    }

    function handleClick(event){
        console.log("Edit list");
        if(event.detail === 1){
            console.log("You have single clicked");
            event.stopPropagation();

            if(list && ((!store.foundList) || store.foundList._id !== idNamePair._id))
                store.findAndSavePlaylistById(idNamePair._id);

            console.log("**************************************************************");
            if(store.foundList)
                console.log(store.foundList);
            console.log("**************************************************************");
        }
        if(event.detail === 2){
            console.log("You have double clicked");
            event.stopPropagation();
            toggleEdit();
        }
    }

    function handleUpdateText(event) {
        event.stopPropagation();
        setText(event.target.value);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            event.stopPropagation();
            console.log(text);
            // store.validatePlaylistName(text);
            // if(store.name)
            store.changeListName(idNamePair._id, text);
            toggleEdit();
        }
    }

    let cards = "";
    if(store.foundList){
        cards = store.foundList.songs.map((song, index) => (
            <SongCard
                id={'playlist-song-' + (index)}
                key={'playlist-song-' + (index)}
                index={index}
                song={song}
                listPublished={published}
            />
        ));
    }
    else{
        console.log("lol nvm");
    }

    function handleUndo(event){
        console.log("handleUndo: " + store.currentModal);
        event.stopPropagation();

        if(store.currentModal !== "NONE"){
            console.log("hiding modal in undo");
            store.hideModals();
        }

        if(store.canUndo()){
            store.undo();
        }
    }

    function handleRedo(event){
        console.log("handleUndo: " + store.currentModal);
        
        event.stopPropagation();

        if(store.currentModal !== "NONE"){
            console.log("hiding modal in redo");
            store.hideModals();
        }
        if(store.canRedo()){
            store.redo();
        }
    }

    function handleDuplicate(event){
        event.stopPropagation();
        store.duplicateList(idNamePair);
        store.setCurrentView("HOME");
    }

    function handlePublish(event){
        event.stopPropagation();
        store.publishPlaylist(idNamePair._id);
        setPublished(true);
    }

    function handleLike(event){
        event.stopPropagation();
        if(list.isPublished)
            store.updatePublishedData(list._id, false, true, false);
    }

    function handleDislike(event){
        event.stopPropagation();
        if(list.isPublished)
            store.updatePublishedData(list._id, false, false, true);
    }

    let publishedBtn = "";
    let undoBtn = "";
    let redoBtn = "";
    let addSongBtn = "";
    let cardWrapper = "";
    let publishedDate = "";
    let listens = "";

    let likeAndDislike="";

    if(list){
        if(!published){
            publishedBtn = (<Button
                variant="contained" sx={btnSx}
                onClick={handlePublish}
                disabled={published}
            >
                Publish
            </Button>);
            
            undoBtn = (<Button
                    variant="contained" sx={btnSx}
                    disabled={!store.canUndo()}
                    onClick = { handleUndo  }
                >
                    Undo
                </Button>);

            redoBtn = (<Button
                variant="contained" sx={btnSx}
                disabled={!store.canRedo()}
                onClick = { handleRedo  }
            >
                Redo
            </Button>);

            addSongBtn = (<Button
                id="add-song-btn"
                variant="contained" sx={addSongBtnSx}
                onClick={handleAddSong}
            >
                <AddIcon></AddIcon>
            </Button>);

            cardWrapper = <Box sx={{ width: "100%", maxHeight: "250px" , overflowY: "scroll"}}>
            {
                cards
            }
            </Box>
        }
        else{
            cardWrapper = <Box sx={{ width: "95%" , marginLeft: "2.5%", maxHeight: "250px" , overflowY: "scroll"}}>
                <Grid sx={{backgroundColor: "purple"}}>
                {
                    cards
                }
                </Grid>
            </Box>

            publishedDate = <>
                <Typography
                    fontFamily={"Lexend Exa"}
                    variant="body2"
                    sx={{  fontWeight: 'bold', margin: "0% 5%" , fontSize:"11px" }}
                >
                    Published
                </Typography>
                <Typography
                    fontFamily={"Lexend Exa"}
                    variant="body2"
                    sx={{  fontWeight: 'bold', color: "green" , fontSize:"11px" }}
                >
                    {(list && list.datePublished) ? new Date(list.datePublished).toLocaleDateString('en-us', { month:"short", day:"numeric", year:"numeric"}) : ""}
                </Typography>
            </>
            listens = <>
                <Typography
                    fontFamily={"Lexend Exa"}
                    variant="body2"
                    sx={{fontSize:"11px"}}
                >
                    Listens
                </Typography>
                <Typography
                    fontFamily={"Lexend Exa"}
                    variant="body2"
                    sx={{  fontWeight: 'bold', color: "green" , fontSize:"11px" }}
                >
                    {(list && published) ? list.listens : 0}
                </Typography>
            </>
            likeAndDislike= <> <Grid sx={{ display:"flex", justifyContent:"space-between" , flexDirection:"row", alignItems:"center", width: "100%"}}>
                    <Button onClick={   handleLike  }>
                        <ThumbUpOutlinedIcon
                            size="large"
                            fontSize="large"
                            edge="end"
                            aria-label="Disike Button"
                            aria-haspopup="true"
                            sx={{  color: "black"   }}
                        />
                    </Button>
                    <Typography
                        fontFamily={"Lexend Exa"}
                        variant="body1"
                    >
                        {(published) ?   list.likes : ""   }
                    </Typography>
                </Grid>
                
                <Grid sx={{ display:"flex", justifyContent:"flex-start" , flexDirection:"row", alignItems:"center"}}>
                    <Button onClick={   handleDislike  }>
                        <ThumbDownOutlinedIcon
                            size="large"
                            fontSize="large"
                            edge="end"
                            aria-label="Disike Button"
                            aria-haspopup="true"
                            sx={{  color: "black"  }}
                        />
                    </Button>
                        <Typography
                            fontFamily={"Lexend Exa"}
                            variant="body1"
                        >
                            {(published) ?   list.dislikes : ""   }
                        </Typography>
                </Grid>
            </>
        }
    }

    let cardContent = <>
        <Grid container sx={{ display:"flex", justifyContent:"space-between" , flexDirection:"row", alignItems:"center", gap:"10%"}}>
            <Grid item sx={{ margin: "2% 5%"}} >
                <Typography
                    fontFamily={"Lexend Exa"}
                    variant="h6"
                    sx={{  fontWeight: 'bold'}}
                >
                    {idNamePair.name}
                </Typography>
                <Typography
                    fontFamily={"Lexend Exa"}
                    variant="body1"
                    sx={{  fontWeight: 'bold' }}
                >
                    By:&nbsp;
                    <Link>{idNamePair.userName}</Link>
                </Typography>
            </Grid>

            <Grid item sx={{ display:"flex", justifyContent:"flex-start" , flexDirection:"row", alignItems:"center", marginRight:"12.5%", gap: "30%"}}>
                {likeAndDislike}
            </Grid>
        </Grid>

        <Collapse in={expand} timeout="auto" unmountOnExit>
            <Grid container  sx={{ display: "flex", alignItem: "center" }}>

                <Grid item sx={{ display: "flex", alignItem: "center", width: "100%"}}>
                    { cardWrapper }
                </Grid>
                
                {addSongBtn}

                <Grid item sx={{ margin: "1%", display:"flex", justifyContent:"space-between", width:"95%"}}>
                    <div className="container" style={{gap: "2.5%"}}>
                        {undoBtn}
                        {redoBtn} 
                    </div>

                    <div className="container" style={{gap: "2.5%"}}>
                        {publishedBtn}
                        <Button
                            variant="contained" sx={btnSx}
                            onClick={handleDeleteList}
                        >
                            Delete
                        </Button>
                        <Button
                            variant="contained" sx={btnSx}
                            onClick={handleDuplicate}
                        >
                            Duplicate
                        </Button>
                    </div>
                </Grid>
            </Grid>
            
        </Collapse>
            
        <Grid style={{ display:"flex", justifyContent:"space-between" , flexDirection:"row", alignItems:"center"}}>
            <Grid style={{ display:"flex", justifyContent:"space-between" , flexDirection:"row", alignItems:"center",  marginLeft:"1%", width: "26%"}}>
                {publishedDate}
            </Grid>
            <Grid sx={{ display:"flex", justifyContent:"flex-end" , flexDirection:"row", alignItems:"center",width:"fit-content"}}>
                <Grid sx={{ display:"flex", justifyContent:"flex-start" , flexDirection:"row", alignItems:"center", marginRight:"70%", gap:"30px", width: "5%"}}>
                    {listens}
                </Grid>
                
                <ExpandBtn
                    onClick={() => {
                        console.log("expand list");
                        store.findAndSavePlaylistById(idNamePair._id);

                        if(list)
                                console.log(list);

                        if(!expand){
                            console.log("unexpand list. Clear transactions");
                            store.clearTransactions();
                            store.clearSelected();

                            if(list)
                                console.log(list);
                        }
                        setExpand(!expand);
                    }}
                    aria-label="Expand" aria-expanded={expand}
                    expand={expand}
                >
                    <KeyboardDoubleArrowDownOutlinedIcon
                        size="large"
                        fontSize="large"
                        edge="end"
                        aria-label="Expand Button"
                        aria-haspopup="true"
                        sx={{  color: "black"  }}
                    />
                </ExpandBtn>
            </Grid>
        </Grid>

        <MUIDeleteModal />
        <RenamePlaylistErrorModal/>
    </>
    

    let cardElement = <Card
            id={idNamePair._id}
            key={idNamePair._id}
            onClick={handleClick}
            sx={{
                margin:"1%", width:"95%", height:"10%",
                display:"flex", flexDirection:"column", justifyContent:"space-between",
            }}
        >
            {cardContent}
        </Card>

    if(published){
        cardElement = <Card
            id={idNamePair._id}
            key={idNamePair._id}
            onClick={handleClick}
            sx={{
                margin:"1%", width:"95%", height:"10%",
                display:"flex", flexDirection:"column", justifyContent:"space-between",
                backgroundColor: "#fdc43c"
            }}
        >
            {cardContent}
        </Card>
    }
    else if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                sx={{backgroundColor:"white"}}
                autoFocus
            />
    }


    return (
        cardElement
    );
}

export default ListCard;