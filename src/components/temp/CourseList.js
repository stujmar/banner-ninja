import React from 'react';
import PropTypes from 'prop-types'

const CourseList = (props) => {

    return (
        <>
        <div>Courses</div>
        <table className="table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author ID</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
                { props.courses.map( course => {
                    return <tr key={course.id}>
                        <td>{course.title}</td>
                        <td>{course.authorId}</td>
                        <td>{course.category}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </>
    )
}

export default CourseList;

CourseList.propTypes = {
    courses: PropTypes.array.isRequired
};

CourseList.defaultProps = {
    courses: []
}
