import React, { useState } from 'react';
// import { Prompt } from 'react-router-dom'
import CourseForm from './CourseForm'
import * as courseApi from "../../api/courseApi"

const ManageCourses = (props) => {
    const [ course, setCourse ] = useState({
        id: null,
        slug: "",
        title: "",
        authorId: null,
        category: ""
    })

    function handleChange({ target }) {
        // const updatedCourse = {...course};
        // updatedCourse.title = event.target.value;
        setCourse({...course, [target.name]: target.value}); // computed property not an array
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        courseApi.saveCourse(course).then(() => {
            props.history.push("/courses");
        })
    }

    return (
        <>
        <h2>Manage Courses</h2>
        {/* <Prompt when={true} message="Are you sure you want to leave?" /> */}
        {props.match.params.slug}
        <CourseForm course={course} onChange={handleChange} onSubmit={handleSubmit}/>
        </>
    )
}

export default ManageCourses;