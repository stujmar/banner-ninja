import React from 'react';
import InputText from './InputText';

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
        
            <InputText
                label="Category"
                onChange={props.onChange}
                id="category"
                name="category"
                value={props.course.category}
                error={props.errors.category}
            />
       
            <input type="submit" value="Save" className="btn bt-primary" />
        </form>
    )
}

export default CourseForm;