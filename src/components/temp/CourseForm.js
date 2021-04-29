import React from 'react';
import TextInput from './TextInput';

const CourseForm = (props) => {
    return (
        <form className="border m-4 rounded-lg shadow-sm border-gray-300 p-4">

            <TextInput  // Title Field
                label="Title"
                id="title"
                type="text"
                name="title"
                className="form-control"
                onChange={props.onChange}
                value={props.course.title}
            />

            <div className="form-group">
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
            </div>
        
            <div className="form=group">
                <label htmlFor="category">Category</label>
                <div className="field">
                    <input
                        type="text"
                        id="category"
                        name="category"
                        className="form=control"
                        value={props.course.category}
                    />
                </div>
            </div>

            <input type="submit" value="Save" className="btn bt-primary" />
        </form>
    )
}

export default CourseForm;