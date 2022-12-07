import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

import MUIRemoveSongModal from './MUIRemoveSongModal'
import MUIEditSongModal from './MUIEditSongModal'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [ draggedTo, setDraggedTo ] = useState(0);
    const { song, index } = props;

    function handleDragStart(event) {
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

        // UPDATE THE LIST
        // store.addMoveSongTransaction(sourceIndex, targetIndex);
    }
    function handleRemoveSong(event) {
        console.log("handleRemoveSong");
        console.log("index: " + index + " \nsong: " + JSON.stringify(song));
        
        store.showRemoveSongModal(index, song);
        console.log("fshuifdhudsfiuhdsfhudsfuhidfhudfuhdfhudfhudfiuh")
        console.log(store)
        console.log("fshuifdhudsfiuhdsfhudsfuhidfhudfuhdfhudfhudfiuh")
    }
    function handleClick(event) {
        // DOUBLE CLICK IS FOR SONG EDITING
        if (event.detail === 2) {
            event.stopPropagation();
            console.log("handleDblClick: EDIT_SONG");
            console.log("index: " + index + " \nsong: " + JSON.stringify(song));

            console.log(store.currentModal);
            console.log(store.currentSong);
            console.log(store.currentSongIndex);

            
            store.showEditSongModal(index, song);
        }
    }

    let cardClass = "list-card unselected-list-card";
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
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                value={"\u2715"}
                disabled={store.isModalOpen()}
                onClick={handleRemoveSong}
            />

            <MUIRemoveSongModal/>
            <MUIEditSongModal/>
        </div>
    );
}

export default SongCard;