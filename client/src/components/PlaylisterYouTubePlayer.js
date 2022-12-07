import React, { useContext, useState } from 'react';
import YouTube from 'react-youtube';
import GlobalStoreContext from '../store';

import Typography from '@mui/material/Typography';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import StopIcon from '@mui/icons-material/Stop';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export default function PlaylisterYouTubePlayer(props) {

    const { store } = useContext(GlobalStoreContext);

    console.log(store);

    const [ player, setPlayer ] = useState({});
    const [ index, setIndex ] = useState(0);
    const [ title, setTitle ] = useState((""));
    const [ artist, setArtist ] = useState("");

    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
    let playlist = [];

    const {currPlayer} = props;

    if(props){
        console.log(currPlayer);
        let queue = currPlayer.songQueue;
    
        if(queue && queue.length > 0){
            console.log(queue);
            playlist = queue.map(song => song.youTubeId);

            console.log(playlist);
        }        
    }

    // // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    // let currentSong = 0;

    const playerOptions = {
        width: '100%',
        height: '250',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    function loadAndPlayCurrentSong(player) {
        if(!currPlayer.list || !currPlayer.listName || !currPlayer.songQueue || !currPlayer.song)
            return;

        console.log("loadAndPlayCurrentSong");
        console.log(player);

        let song = playlist[index];
        updateSongInfo();
        player.loadVideoById(song);
        player.playVideo();
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        let currentSong = index;
        currentSong++;
        currentSong = currentSong % playlist.length;
        setIndex(currentSong);
    }

    function updateSongInfo() {
        console.log("updateSongInfo");
        let song = currPlayer.list.songs[index];
        if(song){
            console.log("Found song " + JSON.stringify(song) + "@ index" + index);
            store.setCurrentSong(song, index);

            currPlayer.song = song;

            setTitle(song.title);
            setArtist(song.artist);
        }
    }

    function onPlayerReady(event) {
        if(!store.foundList || !currPlayer.list || !currPlayer.listName || !currPlayer.songQueue || !currPlayer.song)
            return;

        console.log("onPlayerReady " + store.foundList._id);
        setPlayer({ player: event.target });

        
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();

        if(store.foundList.isPublished)
            store.updatePublishedData(store.foundList._id, true, false, false);

        updateSongInfo();
    }

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        let player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong();
            loadAndPlayCurrentSong(player);
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
        }
    }

    const typographySx = {
        fontFamily: "Lexend Exa",
        fontSize: "13.5px"
    }

    let songDisplayInfo = "";
    let songInfo = "";
    if(currPlayer && currPlayer.song && currPlayer.song.title && currPlayer.song.artist)
        songInfo = (<>
            <Typography sx={typographySx}>Song #: { index + 1}</Typography>
            <Typography sx={typographySx}>Title: { title }</Typography>
            <Typography sx={typographySx}>Artist: { artist }</Typography>
        </>)

    if(currPlayer && currPlayer.listName)
        songDisplayInfo = (<>
                    <Typography sx={typographySx}>Playlist: {store.foundList.name}</Typography>
                    {songInfo}
                </>)

    let playerController = <div>
        <Button disabled={!store.foundList}>
            <FastRewindIcon
                size="large" fontSize="large" edge="end" aria-haspopup="true"
                sx={{  color: "black" , cursor: 'pointer'  }}
                
                aria-label="Prev Button"
                onClick={ (event) => {
                    event.stopPropagation();
                    if(store.foundList){
                        console.log("Prev songs");
                        if(index > 0){
                            setIndex(index-1);
                            loadAndPlayCurrentSong(player.player);
                        }
                    }
                } }
            />
        </Button>

        <Button disabled={!store.foundList}>
            <StopIcon
                size="large" fontSize="large" edge="end" aria-haspopup="true"
                sx={{  color: "black" , cursor: 'pointer'  }}
                
                aria-label="Stop Button"
                onClick={ (event) => {
                    event.stopPropagation();
                    if(store.foundList){
                        console.log("Stop songs");
                        if(player && player.player)
                            player.player.pauseVideo();
                    }
                } }
            />
        </Button>
        
        <Button disabled={!store.foundList}>
            <PlayArrowIcon
                size="large" fontSize="large" edge="end" aria-haspopup="true"
                sx={{  color: "black" , cursor: 'pointer'  }}
                
                aria-label="Play Button"
                onClick={ (event) => {
                    event.stopPropagation();
                    if(store.foundList){
                        console.log("Play songs");
                        if(player)
                            player.player.playVideo();
                    }
                } }
            />
        </Button>
        
        <Button disabled={!store.foundList}>
            <FastForwardIcon
                size="large" fontSize="large" edge="end" aria-haspopup="true"
                sx={{  color: "black" , cursor: 'pointer'  }}
                
                aria-label="Next Button"
                onClick={ (event) => {
                    event.stopPropagation();
                    incSong();
                    loadAndPlayCurrentSong(player.player);
                } }
            />
        </Button>
    </div>;

    if(!store.foundList || !currPlayer.list || !currPlayer.listName || !currPlayer.songQueue || !currPlayer.song)
        return <Grid container sx={{ display:"flex", justifyContent: "center", alignItems: "center"}}>
                <Grid item sx={{width: '100%', height: '250px', backgroundColor: "gray"}}>
                </Grid>
                <Grid item sx={{width: '100%', height: '110px', display:"flex", justifyContent: "center"}}>
                    <Typography sx={{fontFamily: "Lexend Exa", fontSize: "15px", marginTop: "2%"}}>Now Playing</Typography>
                </Grid>
                <Grid item sx={{ bottom: "0%", backgroundColor:"white", display:"flex", flexDirection: "row", alignItems: "center", justifyContent: "center", width: "80%", margin: "2% 2.5% 2.5% 2.5%", borderRadius:"5%"}}>
                    {playerController}
                </Grid>
            </Grid>;

    return(<div>
            <YouTube
                videoId={playlist[index]}
                opts={playerOptions}
                onReady={onPlayerReady}
                onStateChange={onPlayerStateChange} />
            
            <Grid container sx={{ display:"flex", justifyContent: "center", alignItems: "center", backgroundColor: "yellow"}}>
                <Grid item>
                    <Typography sx={{fontFamily: "Lexend Exa", fontSize: "15px", marginTop: "2%"}}>Now Playing</Typography>
                </Grid>

                <Grid item sx={{width: "100%", alignItems: "left", margin:" 0% 3%" }}>
                    {songDisplayInfo}
                </Grid>
                
                <Grid item sx={{ backgroundColor:"white", display:"flex", flexDirection: "row", alignItems: "center", justifyContent: "center", width: "80%", margin: "2% 2.5% 2.5% 2.5%", borderRadius:"5%"}}>
                    {playerController}
                </Grid>
                
            </Grid>
        </div>);
        
} 