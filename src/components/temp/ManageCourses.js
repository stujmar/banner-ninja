import React from 'react';

const ManageCourses = (props) => {
    return (
        <>
        <h2>Manage Courses</h2>
        {props.match.params.slug}
        </>
    )
}

export default ManageCourses;