import React, { useState, useEffect } from 'react';
import { getCourses } from "../../api/courseApi";
import CourseList from './CourseList';
import { Link } from 'react-router-dom';

const CoursesPage = () => {
    const [ courses, setCourses ] = useState([]);

    useEffect(() => {
        getCourses().then( _courses => setCourses(_courses));
    }, []);
  
        return (
        <div className="border border-gray-300 m-2 p-2 rounded-lg shadow-sm">
            <h2>Courses</h2>
            <Link className="border shadow-sm px-2 rounded hover:bg-gray-50" to="/course">Add Course</Link>
            <CourseList courses={courses}/>
        </div>
        )
}

export default CoursesPage;