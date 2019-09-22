import React from 'react';

const MoneyInput = (props) => {
    const validateInput = e => {
        let previousValue = e.target.getAttribute('previousvalue');
        let newValue = e.target.value;
        let name = e.target.name;

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
        props.onChange(event);
    }


    return (
        <section className="input-section">
            <label className="income-input-section">
                <label className="income-input-lbl">{props.label}</label>
                <input 
                    className="form-control income-input"
                    type="text"
                    name={props.name}
                    previousvalue={props.value}
                    value={props.value}
                    onChange={validateInput}
                />
            </label>
        </section>
    )
}

export default MoneyInput;