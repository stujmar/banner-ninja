import React from 'react';
import { Link } from 'react-router-dom';
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
                        <Link to={`/course/${course.slug}`}>go to course</Link>
                    </tr>
                })}
            </tbody>
        </table>
    </>
    )
}

export default CourseList;

CourseList.propTypes = {
    courses: PropTypes.arrayOf(PropTypes.shape({
        id : PropTypes.number.isRequired,
        title : PropTypes.string.isRequired,
        authorId: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired
    })).isRequired
};

CourseList.defaultProps = {
    courses: []
}
