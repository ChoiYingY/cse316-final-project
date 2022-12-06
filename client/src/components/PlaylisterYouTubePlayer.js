import React from 'react';
import YouTube from 'react-youtube';

import Typography from '@mui/material/Typography';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import StopIcon from '@mui/icons-material/Stop';

import Grid from '@mui/material/Grid';

export default function YouTubePlayerExample(props) {
    // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
    // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
    // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
    // FROM ONE SONG TO THE NEXT

    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
    let playlist = [
        "mqmxkGjow1A",
        "8RbXIMZmVv8",
        "8UbNbor3OqQ"
    ];

    const {currPlayer} = props;
    if(props){
        console.log(currPlayer);
    }

    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    let currentSong = 0;

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
        let song = playlist[currentSong];
        player.loadVideoById(song);
        player.playVideo();
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        currentSong++;
        currentSong = currentSong % playlist.length;
    }

    function onPlayerReady(event) {
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
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

    let songInfo = <></>;
    if(currPlayer.listName && currPlayer.song.title && currPlayer.song.artist)
    songInfo = <>
                    <Typography>Playlist: {currPlayer.listName}</Typography>
                    <Typography>Title: {currPlayer.song.title}</Typography>
                    <Typography>Artist: {currPlayer.song.artist}</Typography>
                </>

    return(<div>
            <YouTube
            videoId={playlist[currentSong]}
            opts={playerOptions}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange} />
            
            <Grid container sx={{ display:"flex", justifyContent: "center", alignItems: "center", backgroundColor: "yellow"}}>
                <Grid item>
                    <Typography>Now Playing</Typography>
                </Grid>

                <Grid item sx={{width: "100%", alignItems: "left"}}>
                    {songInfo}
                </Grid>
                
                <Grid sx={{ backgroundColor:"white", display:"flex", flexDirection: "row", alignItems: "center", justifyContent: "center", width: "80%", margin: "2.5%"}}>    
                    <FastRewindIcon
                        size="large" fontSize="large" edge="end" aria-haspopup="true"
                        sx={{  color: "black" , cursor: 'pointer'  }}
                        
                        aria-label="Play Button"
                        onClick={ () => {
                            console.log("Prev songs");
                        } }
                    />
                    <StopIcon
                        size="large" fontSize="large" edge="end" aria-haspopup="true"
                        sx={{  color: "black" , cursor: 'pointer'  }}
                        
                        aria-label="Stop Button"
                        onClick={ () => {
                            console.log("Stop songs");
                        } }
                    />
                    <PlayArrowIcon
                        size="large" fontSize="large" edge="end" aria-haspopup="true"
                        sx={{  color: "black" , cursor: 'pointer'  }}
                        
                        aria-label="Play Button"
                        onClick={ () => {
                            console.log("Play songs");
                        } }
                    />
                    <FastForwardIcon
                        size="large" fontSize="large" edge="end" aria-haspopup="true"
                        sx={{  color: "black" , cursor: 'pointer'  }}
                        
                        aria-label="Play Button"
                        onClick={ () => {
                            console.log("Next songs");
                        } }
                    />
                </Grid>
            </Grid>
        </div>);
        
} 