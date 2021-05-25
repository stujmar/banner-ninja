import React, { useState, useEffect } from 'react';
// import { getCourses } from "../../api/courseApi";
import courseStore from '../../stores/courseStore';
import CourseList from './CourseList';
import { Link } from 'react-router-dom';
import { loadCourses } from '../../actions/courseActions';

const CoursesPage = () => {
    const [ courses, setCourses ] = useState([]);

    useEffect(() => {
        courseStore.addChangeListener(onChange);
        if (courseStore.getCourses().length === 0) loadCourses();
        // getCourses().then( _courses => setCourses(_courses));
        // setCourses(courseStore.getCourses());
    }, []);
  
    function onChange(){
        setCourses(courseStore.getCourses());
    }

        return (
        <div className="border border-gray-300 m-2 p-4 rounded-lg shadow-sm">
            <CourseList courses={courses}/>
            <div className="mt-4">
                <Link className="border shadow-sm px-2 rounded hover:bg-gray-50" to="/course">Add Course</Link>
            </div>
        </div>
        )
}

export default CoursesPage;