import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import jsTPS from '../common/jsTPS'
import api from './store-request-api'
import CreateSong_Transaction from '../transactions/CreateSong_Transaction'
import MoveSong_Transaction from '../transactions/MoveSong_Transaction'
import RemoveSong_Transaction from '../transactions/RemoveSong_Transaction'
import UpdateSong_Transaction from '../transactions/UpdateSong_Transaction'
import AuthContext from '../auth'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});
console.log("create GlobalStoreContext");

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    SET_LIST_NAME_WARNING: "SET_LIST_NAME_WARNING",
    EDIT_SONG: "EDIT_SONG",
    REMOVE_SONG: "REMOVE_SONG",
    HIDE_MODALS: "HIDE_MODALS",
    SET_CURRENT_VIEW: "SET_CURRENT_VIEW",
    SET_FOUND_LIST: "SET_FOUND_LIST",
    UPDATE_LIST: "UPDATE_LIST",
    CLEAR_SELECTED: "CLEAR_SELECTED",
    SET_CURRENT_SONG: "SET_CURRENT_SONG",
    SET_PLAYER_COMM_VIEW: "SET_PLAYER_COMM_VIEW",
    SAVE_COMMENT_LIST: "SAVE_COMMENT_LIST",
    SAVE_SEARCH: "SAVE_SEARCH",
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

const CurrentModal = {
    NONE : "NONE",
    DELETE_LIST : "DELETE_LIST",
    EDIT_SONG : "EDIT_SONG",
    REMOVE_SONG : "REMOVE_SONG"
}

const CurrentView = {
    HOME : "HOME",
    ALL_LISTS : "ALL_LISTS",
    USERS : "USERS"
}

const PlayerCommentView = {
    PLAYER: "PLAYER",
    COMMENTS: "COMMENTS"
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        currentModal : CurrentModal.NONE,
        idNamePairs: [],
        currentList: null,
        currentSongIndex : -1,
        currentSong : null,
        newListCounter: 0,
        listNameActive: false,
        listIdMarkedForDeletion: null,
        listMarkedForDeletion: null,
        currentView: CurrentView.HOME,
        warningMsg: null,
        foundList: null,
        playerCommView: PlayerCommentView.PLAYER,
        searchResult: [],
        searchInput: []
    });
    const history = useHistory();

    console.log("inside useGlobalStore");

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);
    console.log("auth: " + JSON.stringify(auth));

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                console.log("CHANGE_LIST_NAME");
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentView: store.currentView,
                    warningMsg: null,
                    foundList: null,
                    searchResult: store.searchResult,
                    playerCommView: store.playerCommView,
                    searchInput: store.searchInput,
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                console.log("CLOSE_CURRENT_LIST");
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentView: store.currentView,
                    warningMsg: null,
                    foundList: null,
                    playerCommView: store.playerCommView,
                    searchInput: store.searchInput,
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                console.log("CREATE_NEW_LIST");
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentView: CurrentView.HOME,
                    warningMsg: null,
                    foundList: store.foundList,
                    searchResult: store.searchResult,
                    playerCommView: PlayerCommentView.PLAYER,
                    searchInput: store.searchInput,
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                console.log("LOAD_ID_NAME_PAIRS");
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentView: store.currentView,
                    warningMsg: null,
                    foundList: store.foundList,
                    searchResult: store.searchResult,
                    playerCommView: store.playerCommView,
                    searchInput: store.searchInput,
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                console.log("MARK_LIST_FOR_DELETION");
                return setStore({
                    currentModal : CurrentModal.DELETE_LIST,
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: payload.id,
                    listMarkedForDeletion: payload.playlist,
                    currentView: store.currentView,
                    warningMsg: null,
                    foundList: store.foundList,
                    searchResult: store.searchResult,
                    playerCommView: store.playerCommView,
                    searchInput: store.searchInput,
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                console.log("SET_CURRENT_LIST");
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentView: store.currentView,
                    warningMsg: null,
                    foundList: store.foundList,
                    searchResult: store.searchResult,
                    playerCommView: store.playerCommView,
                    searchInput: store.searchInput,
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                console.log("SET_LIST_NAME_EDIT_ACTIVE");
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.foundList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentView: store.currentView,
                    warningMsg: null,
                    foundList: payload,
                    searchResult: store.searchResult,
                    playerCommView: store.playerCommView,
                    searchInput: store.searchInput,
                });
            }
            case GlobalStoreActionType.SET_LIST_NAME_WARNING: {
                console.log("SET_LIST_NAME_WARNING");
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentView: store.currentView,
                    warningMsg: payload,
                    foundList: store.foundList,
                    searchResult: store.searchResult,
                    playerCommView: store.playerCommView,
                    searchInput: store.searchInput,
                });
            }
            case GlobalStoreActionType.EDIT_SONG: {
                console.log("EDIT_SONG");
                return setStore({
                    currentModal : CurrentModal.EDIT_SONG,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentView: store.currentView,
                    warningMsg: null,
                    foundList: store.foundList,
                    searchResult: store.searchResult,
                    playerCommView: store.playerCommView,
                    searchInput: store.searchInput,
                });
            }
            case GlobalStoreActionType.REMOVE_SONG: {
                console.log("REMOVE_SONG")
                return setStore({
                    currentModal : CurrentModal.REMOVE_SONG,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentView: store.currentView,
                    warningMsg: null,
                    foundList: store.foundList,
                    searchResult: store.searchResult,
                    playerCommView: store.playerCommView,
                    searchInput: store.searchInput,
                });
            }
            case GlobalStoreActionType.HIDE_MODALS: {
                console.log("HIDE_MODALS")
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentView: store.currentView,
                    warningMsg: null,
                    foundList: store.foundList,
                    searchResult: store.searchResult,
                    playerCommView: store.playerCommView,
                    searchInput: store.searchInput,
                } ) ;
            }
            case GlobalStoreActionType.SET_CURRENT_VIEW: {
                console.log("SET_CURRENT_VIEW")
                return setStore({
                    currentModal : store.currentModal,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentView: payload,
                    warningMsg: null,
                    foundList: (payload !== store.currentView) ? null : store.foundList,
                    playerCommView: PlayerCommentView.PLAYER,
                    searchInput: [],
                    searchResult: [],
                });
            }
            case GlobalStoreActionType.SET_FOUND_LIST: {
                console.log("SET_FOUND_LIST")
                console.log(payload)
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentView: store.currentView,
                    warningMsg: null,
                    foundList: payload,
                    searchResult: store.searchResult,
                    playerCommView: store.playerCommView,
                    searchInput: store.searchInput,
                });
            }
            case GlobalStoreActionType.UPDATE_LIST: {
                console.log("UPDATE_LIST")
                console.log(payload)
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentView: store.currentView,
                    warningMsg: null,
                    foundList: payload,
                    searchResult: store.searchResult,
                    playerCommView: store.playerCommView,
                    searchInput: store.searchInput,
                });
            }
            case GlobalStoreActionType.SET_CURRENT_SONG: {
                console.log("SET_CURRENT_SONG");
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: payload.index,
                    currentSong: payload.song,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentView: store.currentView,
                    warningMsg: null,
                    foundList: store.foundList,
                    searchResult: store.searchResult,
                    playerCommView: store.playerCommView,
                    searchInput: store.searchInput,
                });
            };
            case GlobalStoreActionType.SAVE_COMMENT_LIST :{
                console.log("SAVE_COMMENT_LIST")
                console.log(payload)

                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload.list,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentView: store.currentView,
                    warningMsg: null,
                    foundList: payload.list,
                    searchResult: store.searchResult,
                    playerCommView: store.playerCommView,
                    searchInput: payload.comments
                });
            }
            case GlobalStoreActionType.SAVE_SEARCH :{
                console.log("SAVE_SEARCH")
                console.log(payload)
                console.log("SAVE_SEARCH")

                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentView: store.currentView,
                    warningMsg: null,
                    foundList: store.foundList,
                    playerCommView: store.playerCommView,
                    searchInput: payload.input,
                    searchResult: payload.result
                });
            }
            default:
                return store;
        }
    }

    store.setCurrentView = function(view){
        switch(view){
            case (CurrentView.HOME):
            case (CurrentView.ALL_LISTS):
            case (CurrentView.USERS):
            {
                console.log(view);

                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_VIEW,
                    payload: view
                });
                break;
            }
            default:
                console.log("invalid view");
                break;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;

                console.log(auth.user.email);
                console.log(playlist.ownerEmail);

                if(auth.user.email === playlist.ownerEmail){
                    console.log("EMAIL MATCHED. YOU CAN NOW CHANGE LIST NAME");

                    async function updateList(playlist) {
                        response = await api.updatePlaylistById(playlist._id, playlist);
                        if (response.data.success) {
                            async function getListPairs(playlist) {
                                response = await api.getPlaylistPairs();
                                if (response.data.success) {
                                    let pairsArray = response.data.idNamePairs;
                                    storeReducer({
                                        type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                        payload: {
                                            idNamePairs: pairsArray
                                        }
                                    });
                                }
                            }
                            getListPairs(playlist);
                        }
                    }
                    updateList(playlist);
                }
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        console.log("inside store.closeCurrentList()");
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        tps.clearAllTransactions();
        history.push("/");
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;
        console.log(auth.user);
        console.log(auth.user.userName);

        const response = await api.createPlaylist(auth.user.userName, newListName, [], auth.user.email);
        console.log("createNewList response: " + response);
        if (response.status === 201) {
            tps.clearAllTransactions();
            let newList = response.data.playlist;

            console.log(auth.user.userName);
            console.log(auth.user.email);
            console.log(newList);

            if(newList.ownerEmail === auth.user.email){
                console.log("EMAIL MATCHED. YOU CAN NOW CREATE NEW LIST");
                
                store.loadIdNamePairs();
                
                storeReducer({
                    type: GlobalStoreActionType.CREATE_NEW_LIST,
                    payload: null
                });
            }
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    store.duplicateList = async function(idNamePair) {
        console.log(auth.user);
        console.log(auth.user.userName);

        console.log(idNamePair.name);
        console.log(idNamePair._id);

        let id = idNamePair._id;

        console.log("store.foundList: " + JSON.stringify(store.foundList));

        let songs = [];
        let newListName = "";

        async function findList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                console.log(playlist);
                songs = playlist.songs;
                newListName = playlist.name + "_0";

                response = await api.duplicatePlaylist(auth.user.userName, newListName, songs, auth.user.email);
                console.log("createNewList response: " + response);
                
                while (response.status === 400 && response.data.samePlaylist === true) {
                    newListName = newListName + "_0";
                    response = await api.duplicatePlaylist(auth.user.userName, newListName, songs, auth.user.email);
                }

                if (response.status === 201) {
                    tps.clearAllTransactions();
                    let newList = response.data.playlist;

                    console.log(auth.user.userName);
                    console.log(auth.user.email);
                    console.log(newList);

                    if(newList.ownerEmail === auth.user.email){
                        console.log("EMAIL MATCHED. YOU CAN NOW CREATE NEW LIST");
                        
                        store.loadIdNamePairs();
                        
                        storeReducer({
                            type: GlobalStoreActionType.CREATE_NEW_LIST,
                            payload: null
                        });
                    }
                }
                else {
                    console.log("API FAILED TO CREATE A NEW LIST");
                }
            }
        }
        findList(id);
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        console.log("store.loadIdNamePairs")
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                console.log(pairsArray);
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = function (id) {
        async function getListToDelete(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                console.log(playlist.ownerEmail);
                if(playlist.ownerEmail === auth.user.email){
                    console.log("EMAIL MATCHED. YOU CAN NOW MARK LIST FOR DELETION");
                    
                    storeReducer({
                        type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                        payload: {id: id, playlist: playlist}
                    });
                }

            }
        }
        getListToDelete(id);
    }

    store.unmarkListForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
            payload: {
                id: null,
                playlist: null
            }
        });
    }

    store.deleteList = function (id) {
        console.log("store.deleteList");
        console.log("id: " + id);
        async function processDelete(id) {
            console.log("now call deletePlaylistById");
            let response = await api.deletePlaylistById(id);
            console.log(response);
            console.log(response.data.success);
            if (response.data.success) {
                console.log("successfully delete list")
                store.loadIdNamePairs();
                console.log(store);
                history.push("/");
            }
        }
        processDelete(id);
    }
    store.deleteMarkedList = function() {
        store.deleteList(store.listIdMarkedForDeletion);
        store.hideModals();
    }
    // THIS FUNCTION SHOWS THE MODAL FOR PROMPTING THE USER
    // TO SEE IF THEY REALLY WANT TO DELETE THE LIST

    store.showEditSongModal = (songIndex, songToEdit) => {
        console.log(songIndex, songToEdit);
        storeReducer({
            type: GlobalStoreActionType.EDIT_SONG,
            payload: {currentSongIndex: songIndex, currentSong: songToEdit}
        });
    }

    store.showRemoveSongModal = (songIndex, songToRemove) => {
        console.log(songIndex);
        console.log(songToRemove);
        storeReducer({
            type: GlobalStoreActionType.REMOVE_SONG,
            payload: {currentSongIndex: songIndex, currentSong: songToRemove}
        });        
    }

    store.hideModals = () => {
        storeReducer({
            type: GlobalStoreActionType.HIDE_MODALS,
            payload: {}
        });    
    }
    store.isDeleteListModalOpen = () => {
        return store.currentModal === CurrentModal.DELETE_LIST;
    }
    store.isEditSongModalOpen = () => {
        return store.currentModal === CurrentModal.EDIT_SONG;
    }
    store.isRemoveSongModalOpen = () => {
        console.log(store)
        return store.currentModal === CurrentModal.REMOVE_SONG;
    }

    store.isModalOpen = () => {
        return (store.currentModal === CurrentModal.DELETE_LIST) || (store.currentModal === CurrentModal.EDIT_SONG) || (store.currentModal === CurrentModal.REMOVE_SONG);
    }

    store.clearTransactions = function() {
        tps.clearAllTransactions();
    }

    store.getPlaylistSize = function() {
        // if(store.currentList)
        //     return store.currentList.songs.length;
        if(store.foundList)
            return store.foundList.songs.length;
        return 0;
    }

    // THIS FUNCTION MOVES A SONG IN THE CURRENT LIST FROM
    // start TO end AND ADJUSTS ALL OTHER ITEMS ACCORDINGLY
    store.moveSong = function(start, end) {
        console.log(store);
        async function asyncMoveSong(id){
            let response = await api.getPlaylistById(id);
            if(response.data.success){
                let playlist = response.data.playlist;
                console.log("playlist found");
                console.log(playlist);

                if(!playlist)
                    return;

                // WE NEED TO UPDATE THE STATE FOR THE APP
                if (start < end) {
                    let temp = playlist.songs[start];
                    for (let i = start; i < end; i++) {
                        playlist.songs[i] = playlist.songs[i + 1];
                    }
                    playlist.songs[end] = temp;
                }
                else if (start > end) {
                    let temp = playlist.songs[start];
                    for (let i = start; i > end; i--) {
                        playlist.songs[i] = playlist.songs[i - 1];
                    }
                    playlist.songs[end] = temp;
                }
                
                console.log(playlist);

                async function asyncUpdateList(playlist){
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        console.log(response.data.id);
                        console.log(response.data.list);

                        console.log(store);
        
                        storeReducer({
                            type: GlobalStoreActionType.SET_FOUND_LIST,
                            payload: response.data.list
                        });
        
                        history.push("/");
                    }
                }
                asyncUpdateList(playlist); 
            }
        }
        asyncMoveSong(store.currentList._id);
    }
    // THIS FUNCTION REMOVES THE SONG AT THE index LOCATION
    // FROM THE CURRENT LIST
    store.removeSong = function(index) {
        console.log(store);
        async function asyncRemoveSong(id){
            if(id === null) 
                id = store.foundList._id;
            
            if(id === null) 
                return null;

            let response = await api.getPlaylistById(id);
            if(response.data.success){
                let playlist = response.data.playlist;
                console.log("playlist found");
                console.log(playlist);

                playlist.songs.splice(index, 1);
                
                console.log(playlist);

                async function asyncUpdateList(playlist){
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        console.log(response.data.id);
                        console.log(response.data.list);

                        console.log(store);
        
                        storeReducer({
                            type: GlobalStoreActionType.SET_FOUND_LIST,
                            payload: response.data.list
                        });
        
                        history.push("/");
                    }
                }
                asyncUpdateList(playlist); 
            }
        }
        asyncRemoveSong(store.currentList._id);
    }

    // THIS FUNCDTION ADDS A CreateSong_Transaction TO THE TRANSACTION STACK
    store.addCreateSongTransaction = (index, id, title, artist, youTubeId) => {
        // ADD A SONG ITEM AND ITS NUMBER
        let song = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        console.log("now adding new transaction");
        let transaction = new CreateSong_Transaction(store, id, index, song);
        tps.addTransaction(transaction);
    }

    store.addNewSong = (id, playlistSize, song) => {
        console.log("we are at addNewSong. Let's call addCreateSongTransaction");
        store.addCreateSongTransaction(playlistSize, id, "Untitled", "Unknown", "dQw4w9WgXcQ");
    }

    store.addMoveSongTransaction = function (start, end) {
        let transaction = new MoveSong_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }
    // THIS FUNCTION ADDS A RemoveSong_Transaction TO THE TRANSACTION STACK
    store.addRemoveSongTransaction = () => {
        let index = store.currentSongIndex;
        let song = store.currentList.songs[index];
        let transaction = new RemoveSong_Transaction(store, store.currentList._id, index, song);
        tps.addTransaction(transaction);
    }

    store.editSong = async function(index, newSongInfo){
        console.log("Song to edit: " + index);
        console.log(newSongInfo);

        if(index < 0 || !store.currentList || !store.currentList.songs)
            return;
        
        console.log("we are now editing");
        
        async function asyncEditSong(){
            let response = await api.getPlaylistById(store.currentList._id);
            if(response.data.success){
                let playlist = response.data.playlist;

                console.log("playlist found");

                console.log(playlist);
                console.log(playlist.songs);
                playlist.songs.splice(index, 1, newSongInfo);
                console.log(playlist.songs);
                
                console.log(playlist);

                async function asyncUpdateList(playlist){
                    let response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        console.log(response.data.id);
                        console.log(response.data.list);

                        storeReducer({
                            type: GlobalStoreActionType.UPDATE_LIST,
                            payload: response.data.list
                        });
                    }
                    else{
                        return;
                    }
                }

                asyncUpdateList(playlist);
            }
        }

        asyncEditSong();
    }

    store.addUpdateSongTransaction = function(currListId, index, oldSong, newSong){
        console.log("addUpdateSongTransaction");
        console.log(store.currentList);
        console.log(index);
        let transaction = new UpdateSong_Transaction(store, currListId, index, oldSong, newSong);
        tps.addTransaction(transaction);
    }

    store.addSong = function(id, index, song){
        console.log("Add song now");
        console.log(id);
        console.log(song);
        console.log(index);

        async function asyncAddSong(id){
            let response = await api.getPlaylistById(id);
            if(response.data.success){
                let playlist = response.data.playlist;
                console.log("playlist found");
                console.log(playlist);
                playlist.songs.splice(index, 0, song);
                
                console.log(playlist);

                async function asyncUpdateList(playlist){
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        console.log(response.data.id);
                        console.log(response.data.list);
        
                        storeReducer({
                            type: GlobalStoreActionType.SET_FOUND_LIST,
                            payload: response.data.list
                        });
        
                        history.push("/");
                    }
                }
                asyncUpdateList(playlist); 
            }
        }
        asyncAddSong(id);
    }

    store.undo = function () {
        console.log("undo: "  + store.currentModal);
        tps.undoTransaction();
    }
    store.redo = function () {
        console.log(store.currentModal);
        tps.doTransaction();
    }
    store.canAddNewSong = function() {
        return (store.currentList !== null);
    }
    store.canUndo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToUndo());
    }
    store.canRedo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToRedo());
    }
    store.canClose = function() {
        return (store.currentList !== null);
    }

    store.isPerformingUndo = function() {
        return tps.isPerformingUndo();
    }

    store.isPerformingDo = function() {
        return tps.isPerformingDo();
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        console.log(store.foundList);

        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: store.foundList
        });
    }

    store.findAndSavePlaylistById = function (id) {
        console.log(store)
            let playlist = null;
            console.log(id);
            async function findList(id) {
                let response = await api.getPlaylistById(id);
                if (response.data.success) {
                    playlist = response.data.playlist;
                    console.log(playlist);

                    storeReducer({
                        type: GlobalStoreActionType.SET_FOUND_LIST,
                        payload: playlist
                    });
                }
            }
            findList(id);
    }


    store.updateCurrentList = function() {
        console.log("updateCurrentList")
        
        if(!store.currentList || !store.currentList._id)
            return ;

        console.log(store.currentList)

        async function asyncUpdateCurrentList() {
            const response = await api.updatePlaylistById(store.currentList._id, store.currentList);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: store.currentList
                });
            }
        }
        asyncUpdateCurrentList();
    }

    store.clearSelected = function(){
        console.log("clearSelected")
        store.clearFoundList = function(){
            storeReducer({
                type: GlobalStoreActionType.CLEAR_SELECTED,
                payload: null
            });
        }
    }

    store.publishPlaylist = function(id){
        console.log("publishPlaylist");

        async function asyncpublishPlaylist(id){
            let response = await api.publishPlaylist(id);
            if(response.data.success){
                let playlist = response.data.list;
                console.log("playlist found");
            }
        }
        asyncpublishPlaylist(id);
    }

    store.updatePublishedData = async function(id, increaseListens, increaseLike, increaseDislike){
        async function asyncUpdatePlaylist(id){
            let response = await api.getPlaylistById(id);

            if(response.data.success){
                let playlist = response.data.playlist;
                console.log("playlist found: ");

                console.log(increaseListens, increaseLike, increaseDislike);
                
                if(increaseListens){
                    console.log("playlist +1 listens: " + playlist.listens);
                    playlist.listens += 1;
                }

                if(increaseLike){
                    console.log("playlist +1 likes: " + playlist.likes);
                    playlist.likes += 1;
                }

                if(increaseDislike){
                    console.log("playlist +1 dislikes: " + playlist.dislikes);
                    playlist.dislikes += 1;
                }

                async function updatePublishList(id, playlist) {
                    response = await api.updatePublishPlaylist(id, playlist);
                    if (response.data.success) {
                        playlist = response.data.playlist;
                        console.log(playlist);

                        store.loadIdNamePairs();
                    }
                }
                updatePublishList(playlist._id, playlist);
            }
        }
        asyncUpdatePlaylist(id);
    }

    store.setCurrentSong = function(song, index){
        console.log("setCurrentSong: " + JSON.stringify(song) + index);
        storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_SONG,
            payload: {
                song: song,
                index: index
            }
        });
    }

    store.setPlayerCommentView = function(view){
        switch(view){
            case (PlayerCommentView.PLAYER):
            case (PlayerCommentView.COMMENTS):
            {
                console.log(view);

                storeReducer({
                    type: GlobalStoreActionType.SET_PLAYER_COMM_VIEW,
                    payload: view
                });
                break;
            }
            default:
                console.log("invalid view");
                break;
        }
    }

    store.postComment = function(user, text){
        console.log(user);
        console.log(text);

        if(!text || !user)
            return;

        var obj = {
            commenter: user,
            text: text
        };

        console.log(obj)

        async function asyncPostComment(id){
            console.log("asyncPostComment: ");
            let response = await api.getPlaylistById(id);

            if(response.data.success){
                let playlist = response.data.playlist;
                console.log("playlist found: ");

                if(playlist.isPublished && playlist.comments){
                    console.log("playlist.comments: " + JSON.stringify(playlist.comments));
                    playlist.comments.push(obj);
                    console.log("playlist.comments: " + JSON.stringify(playlist.comments));
                    async function updatePublishList(id, playlist) {
                        response = await api.updatePublishPlaylist(id, playlist);
                        if (response.data.success) {
                            playlist = response.data.list;
                            console.log(playlist);

                            storeReducer({
                                type: GlobalStoreActionType.SAVE_COMMENT_LIST,
                                payload: {  
                                    comments: playlist.comments,
                                    list: playlist
                                }
                            });
                        }
                    }
                    updatePublishList(playlist._id, playlist);
                }
            }
        }

        if(store.foundList)
            asyncPostComment(store.foundList._id);
        else if(store.currentList)
            asyncPostComment(store.currentList._id);
        else return;
    }

    store.saveAndSearchInput = function(input){
        async function asyncFindAllList(input){
            console.log("asyncFindAllList based on text: ");
            if(store.currentView && store.currentView === CurrentView.USERS){
                console.log("findAllPublishedPlaylistByUser");
                let response = await api.findAllPublishedPlaylistByUser(input);
                if(response.data.success){
                    let playlist = response.data.playlist;
                    console.log("playlist found: ");
                    console.log(playlist);

                    storeReducer({
                        type: GlobalStoreActionType.SAVE_SEARCH,
                        payload: {
                            input: input,
                            result: playlist
                        }
                    });
                }
            }
            else if(store.currentView && store.currentView === CurrentView.ALL_LISTS){
                console.log("findAllPublishedPlaylistByLists");
                let response = await api.findAllPublishedPlaylistByLists(input);
                if(response.data.success){
                    let playlist = response.data.playlist;
                    console.log("playlist found: ");
                    console.log(playlist);

                    storeReducer({
                        type: GlobalStoreActionType.SAVE_SEARCH,
                        payload: {
                            input: input,
                            result: playlist
                        }
                    });
                }
            }
        }
        asyncFindAllList(input);
    }

    store.clearSearch = function(){
        storeReducer({
            type: GlobalStoreActionType.SAVE_SEARCH,
            payload: {
                input: [],
                result: []
            }
        });
    }


    store.validatePlaylistName = function(name){
        if(name.length === 0){
            storeReducer({
                type: GlobalStoreActionType.SET_LIST_NAME_WARNING,
                payload: "Should not rename list to the same name / empty string."
            });
        }
        // const response = api.asyncFindDuplicateName(name);
        // if (response.data.success){
        //     // duplicate found
        //     storeReducer({
        //         type: GlobalStoreActionType.SET_LIST_NAME_WARNING,
        //         payload: `${name} is a list name that is already in use. Please enter others.`
        //     });
        // }
    }

    store.clearWarningMsg = function(){
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_WARNING,
            payload: null
        });
    }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}


export default GlobalStoreContext;
export { GlobalStoreContextProvider };