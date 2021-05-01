import React from 'react';

const InputDrop = (props) => {
    return (
        <div className="text-left">
            <label htmlFor="author">{props.label}</label>
            <div className="field">
                <select
                    id="author"
                    name={props.name}
                    onChange={props.onChange}
                    value={props.authorId || ""}
                    className="form-control"
                >
                    <option value="" />
                    <option value="1">Cory House</option>
                    <option value="2">Scott Allen</option>
                </select>
            </div>
        </div>
    )
}

export default InputDrop;