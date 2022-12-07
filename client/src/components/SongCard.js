import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

import MUIRemoveSongModal from './MUIRemoveSongModal'
import MUIEditSongModal from './MUIEditSongModal'
import { Typography } from '@mui/material';

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [ draggedTo, setDraggedTo ] = useState(0);
    const { song, index , listPublished} = props;

    function handleDragStart(event) {
        console.log("drag has started");
        event.dataTransfer.setData("song", index);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let targetIndex = index;
        let sourceIndex = Number(event.dataTransfer.getData("song"));
        setDraggedTo(false);

        console.log("We have dropped");

        // UPDATE THE LIST
        store.addMoveSongTransaction(sourceIndex, targetIndex);
    }
    function handleRemoveSong(event) {
        event.stopPropagation();

        console.log("handleRemoveSong");
        console.log("index: " + index + " \nsong: " + JSON.stringify(song));
        
        store.showRemoveSongModal(index, song);
    }

    function handleClick(event) {
        // DOUBLE CLICK IS FOR SONG EDITING
        if (event.detail === 2) {
            event.stopPropagation();
            console.log("");
            console.log("handleDblClick: EDIT_SONG\nindex: " + index + " \nsong: " + JSON.stringify(song));

            console.log(store.currentModal);
            console.log(store.currentSong);
            console.log(store.currentSongIndex);

            
            store.showEditSongModal(index, song);
        }
    }

    let songText = <Typography 
            sx={{color: "yellow", margin: "2%", padding:"1.5% 4%"}}
            fontFamily={"Lexend Exa"}
            variant="h6"
        >
            {index + 1}.&nbsp;{song.title} by {song.artist}
        </Typography>;

    console.log("song: " + JSON.stringify(song) + "\nsong.youTubeId: " + song.youTubeId);
    console.log(store.currentSong);
    
    if(store && store.currentSong && song.youTubeId === store.currentSong.youTubeId && index === store.currentSongIndex){
        console.log("it matched!");
        songText = <Typography 
            sx={{color: "orange", margin: "2%", padding:"1.5% 4%"}}
            fontFamily={"Lexend Exa"}
            variant="h6"
        >
            {index + 1}.&nbsp;{song.title} by {song.artist}
        </Typography>;
    }
    

    let modalJSX = "";
    if (!listPublished && store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (!listPublished && store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }

    let removeBtn = "";
    if (!listPublished) {
        removeBtn = <input
            type="button"
            id={"remove-song-" + index}
            className="list-card-button"
            value={"\u2715"}
            disabled={store.isModalOpen()}
            onClick={handleRemoveSong}
            style={{fontSize: "20px", margin: "0% 2%"}}
        />
    }

    let cardClass = "list-card unselected-list-card";

    if(listPublished) {
        return (
            <div key={index} >
                {songText}
            </div>
        );
    }

    if(store && store.currentSong && song.youTubeId === store.currentSong.youTubeId && index === store.currentSongIndex){
        cardClass = "selectedSong";
    }
    else{
        cardClass = "list-card unselected-list-card";
    }

    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
            onClick={handleClick}
        >
            {index + 1}.&nbsp;
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            {removeBtn}

            { modalJSX }
        </div>
    );
}

export default SongCard;