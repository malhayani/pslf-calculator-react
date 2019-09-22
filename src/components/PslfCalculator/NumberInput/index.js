import React from 'react';

const NumberInput = (props) => {
    return (
        <section className="input-section">
            <label className="inline">{props.label}</label>
            <section className="inline number-input">
                <i className="fa fa-minus fa-fw decrease-btn" onClick={props.min <= parseInt(props.value) - 1 ? props.onClick : null}  value={parseInt(props.value) - 1} name={props.name}></i>
                <input
                    className='form-control inline-input'
                    type='text'
                    value={props.value}
                    name={props.name}
                    readOnly/>
                <i className="fa fa-plus fa-fw increase-btn" onClick={props.max >= parseInt(props.value) + 1 ? props.onClick : null} value={parseInt(props.value) + 1} name={props.name}></i>
            </section>
        </section>
    )
}

export default NumberInput;