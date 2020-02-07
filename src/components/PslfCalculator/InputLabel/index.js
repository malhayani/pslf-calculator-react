import React from 'react';

const InputLabel = (props) => {

    const createLabel = () => {
        return props.valid !== ''
            ? <span>
                <span className="error-lbl">*</span> {props.label} <span className="error-lbl">({props.valid})</span>
            </span>
            : <span>{props.label}</span>;
    }

    return (
        <label className={props.classes}>
        { createLabel() }
        </label>
    )
}

export default InputLabel;