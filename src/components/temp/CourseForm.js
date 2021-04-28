import React from 'react';

const CourseForm = (props) => {
    return (
        <form className="border m-4 rounded-lg shadow-sm border-gray-300 p-4">
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <div className="field">
                    <input 
                        id="title"
                        type="text"
                        name="title"
                        className="form-control"
                        value=''
                    />
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="author">Author</label>
                <div className="field">
                    <select
                        id="author"
                        name="authorId"
                        onChange={props.onChange}
                        value=""
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
                        value=""
                    />
                </div>
            </div>

            <input type="submit" value="Save" className="btn bt-primary" />
        </form>
    )
}

export default CourseForm;