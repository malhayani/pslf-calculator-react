import React from 'react';
import InputLabel from '../../InputLabel';

const BooleanInput = (props) => {
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
            <div>
              <label>
                    <label className="boolean-lbl">Yes</label> 
                    { props.value === 'true' 
                        ? <i className="fa fa-check-square fa-fw"></i>
                        : <i className="fa fa-square-o fa-fw" value={true} name={props.name} onClick={props.update}></i>
                    }
                </label>
                {/* If nothing is passed in as a value, don't check either box */}
                <label>
                    <label className="boolean-lbl">No</label>  
                    { props.value === 'true' 
                        ? <i className="fa fa-square-o fa-fw" value={false} name={props.name} onClick={props.update}></i>
                        : props.value === 'false' 
                            ? <i className="fa fa-check-square fa-fw"></i>
                            : <i className="fa fa-square-o fa-fw" value={false} name={props.name} onClick={props.update}></i>
                    }
                </label>
            </div>
        </section>
    )
}

export default BooleanInput;