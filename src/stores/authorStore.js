import { EventEmitter } from 'events';
import Dispatcher from "../appDispatcher";
import actionTypes from '../actions/actionTypes';

const CHANGE_EVENT = "change"
let _authors = [];

class AuthorStore extends EventEmitter { // This EventEmitter might be a node class?
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    getAuthors() {
        return _authors;
    }

    getAuthorBySlug(slug) {
        return _authors.find(author => author.slug === slug); // Google predicate function.
    }
}

const store = new AuthorStore();

// Dispatcher.register((action) => {
//     switch(action.actionType) {// Notified of every action.
//         case actionTypes.CREATE_COURSE:
//             _authors.push(action.course);
//             store.emitChange();
//         break;
//         default:
//            // Nothing to do here.
// })

Dispatcher.register((action) => {
    switch(action.actionType) {
        case actionTypes.LOAD_AUTHORS:
            _authors = action.authors;
            store.emitChange();
            break;
        default:
            // Nothing to do here.
    }
})


export default store;