import React from 'react';

const DialogueBox = (props) => {
    return (
        <div>
            <label className="dialogue">{ props.msg }</label>
        </div>
    )
}

export default DialogueBox;