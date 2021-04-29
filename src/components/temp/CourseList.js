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
                    <th className="border px-1">Title</th>
                    <th className="border px-1">Author ID</th>
                    <th className="border px-1">Category</th>
                    <th className="border px-1">Link</th>
                </tr>
            </thead>
            <tbody>
                { props.courses.map( course => {
                    return <tr key={course.id}>
                        <td className="border px-1">{course.title}</td>
                        <td className="border px-1">{course.authorId}</td>
                        <td className="border px-1">{course.category}</td>
                        <td className="border px-1"><Link to={`/course/${course.slug}`}>go to course</Link></td>
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
