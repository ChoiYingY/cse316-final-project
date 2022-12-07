import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * CreateSong_Transaction
 * 
 * This class represents a transaction that creates a song
 * in the playlist. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class CreateSong_Transaction extends jsTPS_Transaction {
    constructor(initStore, initListId, initIndex, initSong) {
        super();
        this.store = initStore;
        this.id = initListId;
        this.index = initIndex;
        this.song = initSong;
    }

    doTransaction() {
        // if it is not doing any undo, go ahead & do!
        if(!this.store.isPerformingUndo())
            this.store.addSong(this.id, this.index, this.song);
    }
    
    undoTransaction() {
        // if it is not doing any do, go ahead & undo!
        if(!this.store.isPerformingDo()){
            console.log("undo add @" + this.index);
            this.store.removeSong(this.index);
        }
    }
}