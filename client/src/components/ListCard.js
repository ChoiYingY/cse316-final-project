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

function handleAddSong(event){
    console.log("add song");
    store.addCreateSongTransaction();
}

function ListCard(props) {    
    console.log(props);
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const [expand, setExpand] = useState(false);

    const { idNamePair, selected } = props;

    console.log(idNamePair);

    store.findPlaylistById(idNamePair._id);

    // store.setCurrentList(idNamePair._id);

    // const playlist = store.findPlaylistById(idNamePair._id);
    // console.log(playlist);
    

    return (
        <Card sx={{ margin:"1%", width:"95%", height:"10%", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
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

            <Collapse in={expand} timeout="auto" unmountOnExit>
                <Grid container  sx={{ display: "flex", alignItem: "center" }}>
                    <Button
                        variant="contained" sx={addSongBtnSx}
                        onClick={handleAddSong}
                    >
                        <AddIcon></AddIcon>
                    </Button>
                    <Grid item sx={{ margin: "1%", display:"flex", justifyContent:"space-between", width:"95%"}}>
                        <div className="container" style={{gap: "2.5%"}}>
                            <Button variant="contained" sx={btnSx}>Undo</Button>
                            <Button variant="contained" sx={btnSx}>Redo</Button>
                        </div>

                        <div className="container" style={{gap: "2.5%"}}>
                            <Button variant="contained" sx={btnSx}>Publish</Button>
                            <Button variant="contained" sx={btnSx}>Delete</Button>
                            <Button variant="contained" sx={btnSx}>Duplicate</Button>
                        </div>
                    </Grid>
                </Grid>
                
            </Collapse>
            
            <div style={{ display:"flex", justifyContent:"flex-end" }}>
                <ExpandBtn
                    onClick={() => {
                        console.log("expand list");
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
            </div>
        </Card>
    );
}

// /*
//     This is a card in our list of top 5 lists. It lets select
//     a list for editing and it has controls for changing its 
//     name or deleting it.
    
//     @author McKilla Gorilla
// */
// function ListCard(props) {
//     const { store } = useContext(GlobalStoreContext);
//     const [editActive, setEditActive] = useState(false);
//     const [text, setText] = useState("");
//     const { idNamePair, selected } = props;

//     function handleLoadList(event, id) {
//         console.log("handleLoadList for " + id);
//         if (!event.target.disabled) {
//             let _id = event.target.id;
//             if (_id.indexOf('list-card-text-') >= 0)
//                 _id = ("" + _id).substring("list-card-text-".length);

//             console.log("load " + event.target.id);

//             // CHANGE THE CURRENT LIST
//             store.setCurrentList(id);
//         }
//     }

//     function handleToggleEdit(event) {
//         event.stopPropagation();
//         toggleEdit();
//     }

//     function toggleEdit() {
//         let newActive = !editActive;
//         if (newActive) {
//             store.setIsListNameEditActive();
//         }
//         setEditActive(newActive);
//     }

//     async function handleDeleteList(event, id) {
//         event.stopPropagation();
//         let _id = event.target.id;
//         _id = ("" + _id).substring("delete-list-".length);
//         store.markListForDeletion(id);
//     }

//     function handleKeyPress(event) {
//         if (event.code === "Enter") {
//             let id = event.target.id.substring("list-".length);
//             store.changeListName(id, text);
//             toggleEdit();
//         }
//     }
//     function handleUpdateText(event) {
//         setText(event.target.value);
//     }

//     let selectClass = "unselected-list-card";
//     if (selected) {
//         selectClass = "selected-list-card";
//     }
//     let cardStatus = false;
//     if (store.isListNameEditActive) {
//         cardStatus = true;
//     }
//     let cardElement =
//         <ListItem
//             id={idNamePair._id}
//             key={idNamePair._id}
//             sx={{ marginTop: '15px', display: 'flex', p: 1 }}
//             style={{ width: '100%', fontSize: '48pt' }}
//             button
//             onClick={(event) => {
//                 handleLoadList(event, idNamePair._id)
//             }}
//         >
//             <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
//             <Box sx={{ p: 1 }}>
//                 <IconButton onClick={handleToggleEdit} aria-label='edit' disabled={store.isModalOpen() || store.listNameActive}>
//                     <EditIcon style={{fontSize:'48pt'}} />
//                 </IconButton>
//             </Box>
//             <Box sx={{ p: 1 }}>
//                 <IconButton onClick={(event) => {
//                         handleDeleteList(event, idNamePair._id)
//                     }} aria-label='delete'
//                     disabled={store.isModalOpen() || store.listNameActive}
//                     >
//                     <DeleteIcon style={{fontSize:'48pt'}} />
//                 </IconButton>
//             </Box>
//         </ListItem>

//     if (editActive) {
//         cardElement =
//             <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id={"list-" + idNamePair._id}
//                 label="Playlist Name"
//                 name="name"
//                 autoComplete="Playlist Name"
//                 className='list-card'
//                 onKeyPress={handleKeyPress}
//                 onChange={handleUpdateText}
//                 defaultValue={idNamePair.name}
//                 inputProps={{style: {fontSize: 48}}}
//                 InputLabelProps={{style: {fontSize: 24}}}
//                 autoFocus
//             />
//     }
//     return (
//         cardElement
        
//     );
// }

export default ListCard;