import React, { useState, useEffect} from 'react';
import { Prompt } from 'react-router-dom'
import CourseForm from './CourseForm'

const ManageCourses = (props) => {
    return (
        <>
        <h2>Manage Courses</h2>
        {/* <Prompt when={true} message="Are you sure you want to leave?" /> */}
        {props.match.params.slug}
        <CourseForm />
        </>
    )
}

export default ManageCourses;