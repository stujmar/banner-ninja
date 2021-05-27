import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import authorStore from '../../stores/authorStore'
// import { getAuthors } from '../../api/authorApi';
import { loadAuthors } from '../../actions/authorActions';

const CourseList = (props) => {
    const [authors, setAuthors] = useState([]);
    
    useEffect(() => {
        authorStore.addChangeListener(onChange);
        if (authorStore.getAuthors().length === 0) loadAuthors()
        // getAuthors().then((data) => setAuthors(data))
    },[])

    function onChange(){
        setAuthors(authorStore.getAuthors());
    }

    const getAuthorName = (id) => {
        if (authors.length) {
            return authors.filter((author) => { return id === author.id })[0].name
        }
    };

    return (
        <div className="w-max mx-auto">
            <div>Courses</div>
            <table className="table">
                <thead>
                    <tr>
                        <th className="border px-1">Title</th>
                        <th className="border px-1">Author ID</th>
                        <th className="border px-1">Category</th>
                        <th className="border px-1">Link</th>
                        <th className="border px-1">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    { props.courses.map( course => {
                        return <tr key={course.id}>
                            <td className="border px-1">{course.title}</td>
                            <td className="border px-1">{`${getAuthorName(course.authorId)}`}</td>
                            <td className="border px-1">{course.category}</td>
                            <td className="border px-1"><Link to={`/course/${course.slug}`}>go to course</Link></td>
                            <td className="border px-1"><button onClick={() => props.deleteCourse(course.id)}>X</button></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default CourseList;

CourseList.propTypes = {
    courses: PropTypes.arrayOf(PropTypes.shape({
        id : PropTypes.number.isRequired,
        title : PropTypes.string.isRequired,
        authorId: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired
    })).isRequired,
    deleteCourse: PropTypes.func.isRequired
};

CourseList.defaultProps = {
    courses: []
}
