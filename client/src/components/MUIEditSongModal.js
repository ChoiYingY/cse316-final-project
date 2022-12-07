import { useContext, useState } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    height: 400
};

export default function MUIEditSongModal() {
    const { store } = useContext(GlobalStoreContext);

    let song = store.currentSong;
    let index = store.currentSongIndex;

    let songTitle = (song && song.title) ? song.title : "";
    let songArtist = (song && song.artist) ? song.artist : "";
    let songYouTubeId = (song && song.youTubeId) ? song.youTubeId : "";

    const [ title, setTitle ] = useState(songTitle);
    const [ artist, setArtist ] = useState(songArtist);
    const [ youTubeId, setYouTubeId ] = useState(songYouTubeId);

    console.log(store);
    console.log(song);
    console.log(index);

    console.log(songTitle);
    console.log(songArtist);
    console.log(songYouTubeId);

    console.log("*******************************")
    console.log(title);
    console.log(artist);
    console.log(youTubeId);
    console.log("*******************************")


    function handleConfirmEditSong(event) {
        event.stopPropagation();

        if(title === "")    setTitle(songTitle);
        if(artist === "")    setTitle(songArtist);
        if(youTubeId === "")    setTitle(songYouTubeId);

        let newSongData = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };

        if(newSongData.title === "")
            newSongData.title = songTitle;

        if(newSongData.artist === "")
            newSongData.artist = songArtist;

        if(newSongData.youTubeId === "")
            newSongData.youTubeId = songYouTubeId;

        let song = store.currentList.songs[index];
        let oldSongData = {
            title: song.title,
            artist: song.artist,
            youTubeId: song.youTubeId
        };

        if(!store.currentList)  return;

        store.addUpdateSongTransaction(store.currentList._id, index, oldSongData, newSongData);      
    
        store.hideModals();
    }

    function handleCancelEditSong(event) {
        event.stopPropagation();
        store.hideModals();
    }

    function handleUpdateTitle(event) {
        event.stopPropagation();
        setTitle(event.target.value);
    }

    function handleUpdateArtist(event) {
        event.stopPropagation();
        setArtist(event.target.value);
    }

    function handleUpdateYouTubeId(event) {
        event.stopPropagation();
        setYouTubeId(event.target.value);
    }

    let modalClass = "modal";
    if (store.isEditSongModalOpen()) {
        modalClass += " is-visible";
    }

    return (
        <Modal
            open={store.currentModal === "EDIT_SONG" && store.currentSong !== null && store.currentSongIndex !== null}
        >
            <Box sx={style}>
            <div
                id="edit-song-modal"
                className={modalClass}
                data-animation="slideInOutLeft">
            <div
                id='edit-song-root'
                className="modal-dialog">
                <div
                    id="edit-song-modal-header"
                    className="modal-north">Edit Song</div>
                <div
                    id="edit-song-modal-content"
                    className="modal-center">
                    <div id="title-prompt" className="modal-prompt">Title:</div>
                    <input 
                        id="edit-song-modal-title-textfield" 
                        className='modal-textfield' 
                        type="text" 
                        defaultValue={songTitle} 
                        onChange={handleUpdateTitle} />
                    <div id="artist-prompt" className="modal-prompt">Artist:</div>
                    <input 
                        id="edit-song-modal-artist-textfield" 
                        className='modal-textfield' 
                        type="text" 
                        defaultValue={songArtist} 
                        onChange={handleUpdateArtist} />
                    <div id="you-tube-id-prompt" className="modal-prompt">YouTube Id:</div>
                    <input 
                        id="edit-song-modal-youTubeId-textfield" 
                        className='modal-textfield' 
                        type="text" 
                        defaultValue={songYouTubeId} 
                        onChange={handleUpdateYouTubeId} />
                </div>
                <div className="modal-south">
                    <input 
                        type="button" 
                        id="edit-song-confirm-button" 
                        className="modal-button" 
                        value='Confirm' 
                        onClick={handleConfirmEditSong} />
                    <input 
                        type="button" 
                        id="edit-song-cancel-button" 
                        className="modal-button" 
                        value='Cancel' 
                        onClick={handleCancelEditSong} />
                </div>
            </div>
        </div>
            </Box>
        </Modal>
    );
}