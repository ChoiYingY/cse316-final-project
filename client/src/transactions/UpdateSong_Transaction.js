import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * EditSong_Transaction
 * 
 * This class represents a transaction that works with edit song.
 * It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author Choi Ying Yau
 */
export default class UpdateSong_Transaction extends jsTPS_Transaction {
    constructor(initStore, initListId, initIndex, initOldSongInfo, initNewSongInfo) {
        super();
        this.store = initStore;
        this.id = initListId;
        this.index = initIndex;
        this.oldSongInfo = initOldSongInfo;
        this.newSongInfo = initNewSongInfo;
    }

    doTransaction() {
        if(this.store.isPerformingUndo()){
            console.log("Stop. we are in undoTransaction rn so you can't do");
            return;
        }
        else{
            console.log("do: edit song info @ index " + this.index);
            this.store.editSong(this.index, this.newSongInfo);
        }
    }
    
    undoTransaction() {
        if(this.store.isPerformingDo()){
            console.log("Stop. we are in doTransaction rn so you can't undo");
            return;
        }
        else{
            console.log("undo: recover song info @ index " + this.index);
            this.store.editSong(this.index, this.oldSongInfo);
        }
    }
}