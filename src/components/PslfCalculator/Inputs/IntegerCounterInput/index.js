import React from 'react';
import InputLabel from '../../InputLabel';

const IntegerCounterInput = (props) => {
    return (
        <section className="input-section">
            {
                props.label !== ""
                ? <InputLabel 
                    classes={props.form + "-input-lbl"}
                    label={props.label}
                    valid={props.valid} />
                : ""
            }
            <section className="number-input">
                <i className={"fa fa-minus fa-fw decrease-btn " + (props.valid !== '' ? 'invalid-button' : '')} onClick={props.min <= parseInt(props.value) - 1 ? props.onClick : null}  value={parseInt(props.value) - 1} name={props.name} index={props.index}></i>
                <input
                    className={'form-control inline-input ' + (props.valid !== '' ? 'invalid-field' : '') }
                    type='text'
                    value={props.value}
                    name={props.name}
                    readOnly
                    />
                <i className={"fa fa-plus fa-fw increase-btn " + (props.valid !== '' ? 'invalid-button' : '')} onClick={props.max >= parseInt(props.value) + 1 ? props.onClick : null} value={parseInt(props.value) + 1} name={props.name} index={props.index}></i>
            </section>
        </section>
    )
}

export default IntegerCounterInput;