import React from 'react';
import InputDrop from './InputDrop';
import InputText from './InputText';
import PropTypes from 'prop-types';

const CourseForm = (props) => {
    return (
        <form className="border m-4 rounded-lg shadow-sm border-gray-300 p-4" onSubmit={props.onSubmit}>

            <InputText  // Title Field
                label="Title"
                id="title"
                type="text"
                name="title"
                className="form-control"
                onChange={props.onChange}
                value={props.course.title}
                error={props.errors.title}
            />

            <InputDrop 
                label="Author"
                id={props.course.authorId}
                name="authorId"
                onChange={props.onChange}
                value={props.course.authorId || ""}
                error={props.errors.authorId}
            />
            
            {/* <div className="form-group">
                <label htmlFor="author">Author</label>
                <div className="field">
                    <select
                        id="author"
                        name="authorId"
                        onChange={props.onChange}
                        value={props.course.authorId || ""}
                        className="form-control"
                    >
                        <option value="" />
                        <option value="1">Cory House</option>
                        <option value="2">Scott Allen</option>
                    </select>
                </div>
            </div> */}
        
            <InputText
                label="Category"
                onChange={props.onChange}
                id="category"
                name="category"
                value={props.course.category}
                error={props.errors.category}
            />
            
            <button type="submit" value="Save" className="px-4 py-1 font-medium bg-blue-300 text-white shadow-sm rounded-lg hover:bg-blue-400">SAVE</button>
        </form>
    )
}

CourseForm.propTypes = {
    course: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

export default CourseForm;