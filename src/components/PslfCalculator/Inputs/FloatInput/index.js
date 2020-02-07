import React from 'react';
import InputLabel from '../../InputLabel';

const FloatInput = (props) => {
    const validateInput = e => {
        let previousValue = e.target.getAttribute('previousvalue');
        let newValue = e.target.value;
        let name = e.target.name;
        let index = e.target.getAttribute('index');

        let value = previousValue;
        if (newValue) {
            // if new value is valid send new information
            let floatRegex = /^[+-]?((\.\d+)|(\d+(\.\d+)?)|(\d+\.))$/;
            if(floatRegex.test(newValue)) {
                value = newValue;
            }
        } else {
            // is the user deleted the entire input, send empty
            value = newValue;
        }

        
        let event = {
            target: {
                value: value,
                name: name
            }
        }
        if (index) event.target.index = index;
        props.onChange(event);
    }


    return (
        <section className={props.form === "interest" ? "interest-input-section" : "input-section"}>
            <label className={props.form + "-input-section"}>
                {
                    props.label !== ""
                    ? <InputLabel 
                        classes={props.form + "-input-lbl"}
                        label={props.label}
                        valid={props.valid} />
                    : ""
                }
                <input 
                    className={"form-control input-" + props.form + ' ' + (props.valid !== '' ? 'invalid-field' : '') }
                    type="text"
                    name={props.name}
                    previousvalue={props.value}
                    value={props.value}
                    onChange={validateInput}
                    index={props.index}
                    autoComplete="off"
                />
            </label>
        </section>
    )
}

export default FloatInput;