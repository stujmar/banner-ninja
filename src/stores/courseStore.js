import { EventEmitter } from 'events';
import Dispatcher from "../appDispatcher";
import actionTypes from '../actions/actionTypes';

const CHANGE_EVENT = "change"
let _courses = [];

class CourseStore extends EventEmitter { // This EventEmitter might be a node class?
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    getCourses() {
        return _courses;
    }

    getCoursesBySlug(slug) {
        return _courses.find(course => course.slug === slug); // Google predicate function.
    }
}

const store = new CourseStore();

// Dispatcher.register((action) => {
//     switch(action.actionType) {// Notified of every action.
//         case actionTypes.CREATE_COURSE:
//             _courses.push(action.course);
//             store.emitChange();
//         break;
//         default:
//            // Nothing to do here.
// })

Dispatcher.register((action) => {
    switch(action.actionType) {
        case actionTypes.CREATE_COURSE:
            _courses.push(action.course);
            store.emitChange();
            break;
        default:
            // Nothing to do here.
    }
})


export default store;