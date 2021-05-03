import dispatcher from '../appDispatcher';
import * as courseApi from '../api/courseApi';

export function saveCourse(course) {
    courseApi.saveCourse(course).then(savedCourse => {
        dispatcher.dispatch();
    })
}