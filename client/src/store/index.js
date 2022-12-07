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
    UPDATE_LIST: "UPDATE_LIST"
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
        foundList: null
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
                    foundList: null
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
                    foundList: null
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
                    foundList: store.foundList
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
                    foundList: store.foundList
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
                    foundList: null
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
                    foundList: store.foundList
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                console.log("SET_LIST_NAME_EDIT_ACTIVE");
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
                    warningMsg: null,
                    foundList: store.foundList
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
                    foundList: store.foundList
                });
            }
            // 
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
                    foundList: store.foundList
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
                    foundList: store.foundList
                });
            }
            case GlobalStoreActionType.HIDE_MODALS: {
                console.log("HIDE_MODALS")
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentView: store.currentView,
                    warningMsg: null,
                    foundList: store.foundList
                });
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
                    foundList: store.foundList
                });
            }
            case GlobalStoreActionType.SET_FOUND_LIST: {
                console.log("SET_FOUND_LIST")
                console.log(payload)
                return setStore({
                    currentModal : store.currentModal,
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
                    foundList: payload
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
                    foundList: payload
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

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        console.log("store.loadIdNamePairs")
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                console.log("fsdhoiioshfiuhsdsdhiuisfhuioufsiou");
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
        return store.currentModal === CurrentModal.REMOVE_SONG;
    }

    store.isModalOpen = () => {
        return (store.currentModal === CurrentModal.DELETE_LIST) || (store.currentModal === CurrentModal.EDIT_SONG) || (store.currentModal === CurrentModal.REMOVE_SONG);
    }

    store.clearTransactions = function() {
        tps.clearAllTransactions();
    }

    // // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // // moveItem, updateItem, updateCurrentList, undo, and redo
    // store.setCurrentList = function (id) {
    //     console.log(id);
    //     async function asyncSetCurrentList(id) {
    //         let response = await api.getPlaylistById(id);
    //         if (response.data.success) {
    //             let playlist = response.data.playlist;
    //             console.log(playlist);
    //             response = await api.updatePlaylistById(playlist._id, playlist);
    //             if (response.data.success) {
    //                 console.log(response.data);
    //                 response = await api.getPlaylistById(response.data.id);
    //                 if (response.data.success) {
    //                     console.log(response.data);
    //                 }
    //                 // storeReducer({
    //                 //     type: GlobalStoreActionType.SET_CURRENT_LIST,
    //                 //     payload: playlist
    //                 // });
    //             }
    //         }
    //     }
    //     asyncSetCurrentList(id);
    // }

    // store.updateList = async function(playlist){
    //     async function asyncUpdateList(playlist){
    //         let response = await api.updatePlaylistById(playlist._id, playlist);
    //         if (response.data.success) {
    //             console.log(response.data.id);
    //             console.log(response.data.list);

    //             storeReducer({
    //                 type: GlobalStoreActionType.SET_FOUND_LIST,
    //                 payload: response.data.list
    //             });

    //             history.push("/");
    //         }
    //     }
    //     asyncUpdateList(playlist); 
    // }

    store.getPlaylistSize = function() {
        // if(store.currentList)
        //     return store.currentList.songs.length;
        if(store.foundList)
            return store.foundList.songs.length;
        return 0;
    }


    // // THIS FUNCTION CREATES A NEW SONG IN THE CURRENT LIST
    // // USING THE PROVIDED DATA AND PUTS THIS SONG AT INDEX
    // store.createSong = function(index, song) {
    //     let list = store.currentList;
    //     if(!list)
    //         return;

    //     list.songs.splice(index, 0, song);
    //     console.log(list.songs);
    //     // NOW MAKE IT OFFICIAL
    //     store.updateCurrentList();
    // }
    // THIS FUNCTION MOVES A SONG IN THE CURRENT LIST FROM
    // start TO end AND ADJUSTS ALL OTHER ITEMS ACCORDINGLY
    store.moveSong = function(start, end) {
        let list = store.currentList;
        if(!list)
            return;

        // WE NEED TO UPDATE THE STATE FOR THE APP
        if (start < end) {
            let temp = list.songs[start];
            for (let i = start; i < end; i++) {
                list.songs[i] = list.songs[i + 1];
            }
            list.songs[end] = temp;
        }
        else if (start > end) {
            let temp = list.songs[start];
            for (let i = start; i > end; i--) {
                list.songs[i] = list.songs[i - 1];
            }
            list.songs[end] = temp;
        }

        // NOW MAKE IT OFFICIAL
        // store.updateList(store.currentList);
        // store.updateCurrentList();
    }
    // THIS FUNCTION REMOVES THE SONG AT THE index LOCATION
    // FROM THE CURRENT LIST
    store.removeSong = function(index) {
        let list = store.currentList;     
        if(!list)
            return;

        list.songs.splice(index, 1); 

        // NOW MAKE IT OFFICIAL
        // store.updateList(store.currentList);
        // store.updateCurrentList();
    }

    // // THIS FUNCTION UPDATES THE TEXT IN THE ITEM AT index TO text
    // store.updateSong = function(index, songData) {
    //     console.log("store.updateSong() brosssssssss");

    //     let list = store.currentList;
    //     if(!list)
    //         return;

    //     let song = list.songs[index];
    //     song.title = songData.title;
    //     song.artist = songData.artist;
    //     song.youTubeId = songData.youTubeId;

    //     // store.updateList(store.currentList);

    //     // // NOW MAKE IT OFFICIAL
    //     // store.updateCurrentList();
    // }

    // THIS FUNCDTION ADDS A CreateSong_Transaction TO THE TRANSACTION STACK
    store.addCreateSongTransaction = (index, title, artist, youTubeId) => {
        // ADD A SONG ITEM AND ITS NUMBER
        let song = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        let transaction = new CreateSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }

    store.addNewSong = () => {
        let playlistSize = store.getPlaylistSize();
        console.log(playlistSize);
        store.addCreateSongTransaction(playlistSize, "Untitled", "Unknown", "dQw4w9WgXcQ");
    }

    store.addMoveSongTransaction = function (start, end) {
        let transaction = new MoveSong_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }
    // THIS FUNCTION ADDS A RemoveSong_Transaction TO THE TRANSACTION STACK
    store.addRemoveSongTransaction = () => {
        let index = store.currentSongIndex;
        let song = store.currentList.songs[index];
        let transaction = new RemoveSong_Transaction(store, index, song);
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
        let transaction = new UpdateSong_Transaction(store, currListId, index, oldSong, newSong);
        tps.addTransaction(transaction);
    }

    // store.addUpdateSongTransaction = function (index, newSongData) {
    //     console.log(store.currentList);
    //     console.log(newSongData);
    //     console.log(index);
    //     if(index < 0 || !store.currentList || !store.currentList.songs)
    //         return;

    //     let song = store.currentList.songs[index];
    //     let oldSongData = {
    //         title: song.title,
    //         artist: song.artist,
    //         youTubeId: song.youTubeId
    //     };

    //     console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
    //     console.log(song)
    //     console.log("_____________________________")
    //     console.log(song)
    //     console.log("_____________________________")
    //     console.log(oldSongData)
    //     console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")

    //     store.updateSong()

        // let transaction = new UpdateSong_Transaction(this, index, oldSongData, newSongData);        
        // tps.addTransaction(transaction);
    // }

    // store.updateCurrentList = function() {
    //     console.log("updateCurrentList")
        
    //     if(!store.currentList || !store.currentList._id)
    //         return ;

    //     console.log(store.currentList)

    //     // async function asyncUpdateCurrentList() {
    //     //     const response = await api.updatePlaylistById(store.currentList._id, store.currentList);
    //     //     if (response.data.success) {
    //     //         storeReducer({
    //     //             type: GlobalStoreActionType.SET_CURRENT_LIST,
    //     //             payload: store.currentList
    //     //         });
    //     //     }
    //     // }
    //     // asyncUpdateCurrentList();
    // }

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

    // store.addNewSongTransaction = function(currListId, index, song){
    //     console.log("addNewSongTransaction");
    //     let transaction = new AddSong_Transaction(store, currListId, index, song);
    //     tps.addTransaction(transaction);
    // }


    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
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
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    store.findAndSavePlaylistById = function (id) {
        console.log("CALLING findAndSavePlaylistById")
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