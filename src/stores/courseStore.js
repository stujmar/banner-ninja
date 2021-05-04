import { EventEmitter } from 'events';
import Dispatcher from "../appDispatcher";

const CHANGE_EVENT = "change"
let _courses = [];

class CourseStore extends EventEmitter {
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }
}

const store = new CourseStore();

Dispatcher.register((action) => {
    switch(action.actionType) {// Notified of every action.
    
    }
})

export default store;