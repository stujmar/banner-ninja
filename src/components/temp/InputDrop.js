import React from 'react';

const InputDrop = (props) => {
    return (
        <div className="text-left">
            <label htmlFor="author">{props.label}</label>
            <div className="border w-min rounded border border-gray-300 bg-gray-50 shadow-sm">
                <select
                    id="author"
                    name={props.name}
                    onChange={props.onChange}
                    value={props.authorId}
                    className="bg-gray-100"
                >
                    <option value="" />
                    <option value="1">Cory House</option>
                    <option value="2">Scott Allen</option>
                </select>
            </div>
            {props.error && (<div className="font-bold text-red-600">{props.error}</div>)}
        </div>
    )
}

export default InputDrop;