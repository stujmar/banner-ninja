import React, { useState, useEffect } from 'react';
// import { Prompt } from 'react-router-dom'
import CourseForm from './CourseForm'

// import * as courseApi from "../../api/courseApi"
import * as courseActions from  "../../actions/courseActions"
import courseStore from "../../stores/courseStore" // Instead of getting data from the api now we are going to request it from the flux store.

import { toast } from 'react-toastify';

const ManageCourses = (props) => {
    const [ errors, setErrors ] = useState({});
    const [ course, setCourse ] = useState({
        id: null,
        slug: "",
        title: "",
        authorId: null,
        category: ""
    })

    useEffect(() => {
        const slug = props.match.params.slug;
        if (slug) {
            // courseApi.getCourseBySlug(slug).then((_course) => setCourse(_course));
            setCourse(courseStore.getCourseBySlug(slug)); // replace api call with call to flux store.
        }
    }, [props.match.params.slug])

    function handleChange({ target }) {
        // const updatedCourse = {...course};
        // updatedCourse.title = event.target.value;
        setCourse({...course, [target.name]: target.value}); // computed property not an array
    }

    const FormIsValid = () => {
        const _errors = {};

        if (!course.title) _errors.title = "Title is required";
        if (!course.authorId) _errors.authorId = "Author ID is required";
        if (!course.category) _errors.category = "Category is required";

        setErrors(_errors);
        // Form is Valid if the errors object has no properties
        return Object.keys(_errors).length === 0;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!FormIsValid()) return;
        courseActions.saveCourse(course).then(() => {
            props.history.push("/courses");
            toast.success("We did it!");
        });
    }

    return (
        <>
            <h2>Manage Courses</h2>
            {/* <Prompt when={true} message="Are you sure you want to leave?" /> */}
            {props.match.params.slug}
            <CourseForm 
                course={course} 
                onChange={handleChange} 
                onSubmit={handleSubmit} 
                errors={errors}
            />
        </>
    )
}

export default ManageCourses;