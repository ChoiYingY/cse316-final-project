/*
    This is where we'll route all of the received http requests
    into controller response functions.
    
    @author McKilla Gorilla
*/
const express = require('express')
const PlaylistController = require('../controllers/playlist-controller')
const router = express.Router()
const auth = require('../auth')

router.post('/playlist', auth.verify, PlaylistController.createPlaylist)
router.delete('/playlist/:id', auth.verify, PlaylistController.deletePlaylist)
router.get('/playlist/:id', auth.verify, PlaylistController.getPlaylistById)
router.get('/playlistpairs', auth.verify, PlaylistController.getPlaylistPairs)
router.get('/playlists', auth.verify, PlaylistController.getPlaylists)
router.put('/playlist/:id', auth.verify, PlaylistController.updatePlaylistById)

router.post('/playlist', auth.verify, PlaylistController.duplicatePlaylist)
router.put('/playlistPublish/:id', auth.verify, PlaylistController.publishPlaylist)
router.put('/playlistPublishP/:id', auth.verify, PlaylistController.updatePublishPlaylist)

router.get("/playlistPP/:user", auth.verify, PlaylistController.findAllPublishedPlaylistByUser)
router.get("/playlistPPL/:list", auth.verify, PlaylistController.findAllPublishedPlaylistByLists)

// router.get('/playlist', auth.verify, PlaylistController.asyncFindDuplicateName)

module.exports = router