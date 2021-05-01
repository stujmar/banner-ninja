import React from 'react';
import PropTypes from 'prop-types';

const InputText = (props) => {
    let wrapperClass = "text-left";
    if (props.error.length > 0) {
        wrapperClass += " has-error";
    }

    return (
        <div className={wrapperClass}>
            <label htmlFor={props.id}>{props.label}</label>
            <div className="border border-gray-300 shadow-sm rounded w-min">
                <input 
                    id={props.id}
                    type="text"
                    name={props.name}
                    className="bg-gray-50 form-control"
                    value={props.value}
                    onChange={props.onChange}
                />
            </div>
            { props.error && <div className="alert alert-danger text-red-600 font-bold">{props.error}</div>}
        </div>
    )
}

InputText.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    error: PropTypes.string
};

InputText.defaultProps = {
    error: ""
}

export default InputText;
