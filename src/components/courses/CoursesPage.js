import React, { useState, useEffect } from 'react';
// import { getCourses } from "../../api/courseApi";
import courseStore from '../../stores/courseStore';
import CourseList from './CourseList';
import { Link } from 'react-router-dom';
import { loadCourses, deleteCourse } from '../../actions/courseActions';

const CoursesPage = () => {
    const [ courses, setCourses ] = useState(courseStore.getCourses());

    useEffect(() => {
        courseStore.addChangeListener(onChange);
        if (courseStore.getCourses().length === 0) loadCourses();
        // getCourses().then( _courses => setCourses(_courses));
        // setCourses(courseStore.getCourses());
        return () => courseStore.removeChangeListener(onChange); // Cleanup on unmount
    }, []);
  
    function onChange(){
        setCourses(courseStore.getCourses());
    }

    const handleDelete = (id) => {
            console.log(id);
            deleteCourse(id);
    }

        return (
        <div className="border border-gray-300 m-2 p-4 rounded-lg shadow-sm">
            <CourseList courses={courses} deleteCourse={handleDelete} />
            <div className="mt-4">
                <Link className="border shadow-sm px-2 rounded hover:bg-gray-50" to="/course">Add Course</Link>
            </div>
        </div>
        )
}

export default CoursesPage;