import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';

import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
/*
//     This is a card in our list of top 5 lists. It lets select
//     a list for editing and it has controls for changing its 
//     name or deleting it.
    
//     @author McKilla Gorilla
// */

// const addSongBtnSx = {
//     backgroundColor: "#414397",
//     width:"95%",
//     margin: "2.5% auto",
//     padding: "2%",
//     '&:hover':{
//         backgroundColor: "#2d2e79"
//     }
// };

// const btnSx = {
//     cursor: 'pointer',
//     margin: "1.5% 0% ",
//     borderRadius: "10%",
//     padding: "2% 2%",
//     width: "50px",
//     fontSize: '10px',
//     backgroundColor: "#b91e1e",
//     '&:hover':{
//         backgroundColor: "#881313"
//     }
// };

function CommentCard(props) {    
    console.log(props);

    const { commenter, text } = props;

    // const { store } = useContext(GlobalStoreContext);

    console.log(CommentCard);



    return (
        <Grid container sx={{ display:"flex", justifyContent:"space-between" , flexDirection:"column", alignItems:"center", backgroundColor: "lightgray", width:"95%", borderRadius:"5%", marginTop: "2%", height:"fit-content"}}>
            <Grid item sx={{ display:"flex", justifyContent:"flex-start" , flexDirection:"row", alignItems:"center", width:"95%", marginTop: "2%", height:"fit-content"}}>
                <Grid>
                    <Link to="">{commenter}</Link>
                </Grid>
            </Grid>

            <Grid item sx={{ display:"flex", justifyContent:"flex-start" , flexDirection:"row", alignItems:"center", width:"95%", marginBottom: "2%"}}>
                <Grid>
                    <Typography>{text}</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default CommentCard;