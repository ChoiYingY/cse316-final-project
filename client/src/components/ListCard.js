import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';

import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import KeyboardDoubleArrowDownOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowDownOutlined';
import MUIDeleteModal from './MUIDeleteModal';
import RenamePlaylistErrorModal from './RenamePlaylistErrorModal';
import SongCard from './SongCard.js';

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
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const [expand, setExpand] = useState(false);

    console.log(store);

    const { idNamePair, selected } = props;

    console.log(`selected: ${selected}`);

    console.log(idNamePair);

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
        console.log(store.foundList);
        let newActive = !editActive;
        if (newActive) {
            console.log("HIHIHIHIHIHIHIHIIH");
            console.log(store.foundList);
            store.setIsListNameEditActive();
            console.log(store.foundList);
        }
        setEditActive(newActive);
    }

    function handleClick(event){
        console.log("Edit list");
        if(event.detail === 1){
            console.log("You have single clicked");
            event.stopPropagation();

            if(store.foundList && store.foundList._id !== idNamePair._id)
                store.findAndSavePlaylistById(idNamePair._id);

            console.log("**************************************************************");
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
                listPublished={(store.foundList && store.foundList._id === idNamePair._id && store.foundList.isPublished)}
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
    }

    let publishedBtn = "";
    let undoBtn = "";
    let redoBtn = "";
    let addSongBtn = "";
    let cardWrapper = "";
    let publishedDate = "";
    let listens = "";

    if(store.foundList){
        if(!store.foundList.isPublished){
            publishedBtn = (<Button
                variant="contained" sx={btnSx}
                onClick={handlePublish}
                disabled={((store.foundList && store.foundList._id === idNamePair._id && store.foundList.isPublished))}
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

            cardWrapper = <Box sx={{ width: "100%" }}>
            {
                cards
            }
            </Box>
        }
        else{
            cardWrapper = <Box sx={{ width: "95%" , marginLeft: "2.5%"}}>
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
                    {(store.foundList && store.foundList._id === idNamePair._id && store.foundList.isPublished && store.foundList.datePublished) ? new Date(store.foundList.datePublished).toLocaleDateString('en-us', { month:"short", day:"numeric", year:"numeric"}) : ""}
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
                    {(store.foundList && store.foundList.datePublished) ? store.foundList.listens : 0}
                </Typography>
            </>
        }
    }

    let cardContent = <>
        <Grid>
            <Typography
                fontFamily={"Lexend Exa"}
                variant="h5"
                sx={{  fontWeight: 'bold', margin: "2% 5%" }}
            >
                {idNamePair.name}
            </Typography>
            <Typography
                fontFamily={"Lexend Exa"}
                variant="bod1"
                sx={{  fontWeight: 'bold', margin: "2% 5%" }}
            >
                By:&nbsp;
                <Link>{idNamePair.userName}</Link>
            </Typography>
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
                        console.log(store.foundList);
                        if(!expand){
                            console.log("unexpand list. Clear transactions");
                            store.clearTransactions();
                            store.clearSelected();

                            console.log(store.foundList);
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

    if(store.foundList && store.foundList._id === idNamePair._id && store.foundList.isPublished){
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