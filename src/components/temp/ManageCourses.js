import React, { useState, useEffect} from 'react';
// import { Prompt } from 'react-router-dom'
import CourseForm from './CourseForm'

const ManageCourses = (props) => {
    const [ course, setCourse ] = useState({
        id: null,
        slug: "",
        title: "",
        authorId: null,
        category: ""
    })

    function handleTitleChange(event) {
        // const updatedCourse = {...course};
        // updatedCourse.title = event.target.value;

        const updatedCourse = {...course, title: event.target.value};
        setCourse(updatedCourse);
        
    }

    return (
        <>
        <h2>Manage Courses</h2>
        {/* <Prompt when={true} message="Are you sure you want to leave?" /> */}
        {props.match.params.slug}
        <CourseForm course={course} onTitleChange={handleTitleChange}/>
        </>
    )
}

export default ManageCourses;