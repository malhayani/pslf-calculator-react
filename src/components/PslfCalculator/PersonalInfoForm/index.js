import React, { useState, useEffect } from 'react';
import TextInput from '../TextInput';
import BooleanInput from '../BooleanInput';
import NumberInput from '../NumberInput';
import DropdownInput from '../DropdownInput';

const PersonalInfoForm = (props) => {
    // Personal Info State with setter method
    const [formConditions, setFormConditions] = useState({
        currentlyHaveChildren: '',
        planningToHaveChildren: false,
        plannedNumberOfChildren: 0
    }); 

    // function to update components state
    const updateFormConditions = e => {
        let value = e.target.hasOwnProperty('value') 
            ? e.target.value
            : e.target.getAttribute('value');
        let name = e.target.hasOwnProperty('name') 
            ? e.target.name
            : e.target.getAttribute('name');
        
        setFormConditions({
            ...formConditions, 
            [name]: value
        });
    }

    // call back function to update future children array when the number of planned children changes
    useEffect(() => {
        updateFutureChildrenArray();
    }, [formConditions.plannedNumberOfChildren])

    const updateFutureChildrenArray = () => {
        const currentYear = new Date().getFullYear();
        let futureChildren = JSON.parse(JSON.stringify(props.personalInfo.futureChildren));
        const plannedNumberOfChildren = formConditions.plannedNumberOfChildren;
        
        if (plannedNumberOfChildren <= 0 || !plannedNumberOfChildren) {
            futureChildren = [];
        } else {
            if (plannedNumberOfChildren > futureChildren.length) { // if the user has increased the number of children, add one to the array
                futureChildren.push(currentYear);
            } else if (plannedNumberOfChildren < futureChildren.length) { // if the user has decreased the number of children, remove the last one
                futureChildren.pop();
            }
        }

        const object = {
            target: {
                value: futureChildren,
                name: 'futureChildren'
            }
        }
        props.update(object);
    }

    const numberWithSuffix = (num) => {
        num = num.toString();
        let suffix = 'th';
        const lastNum = num.substring(num.length - 1, num.length);
        if (lastNum === "1" && num !== '11') suffix = 'st';
        else if (lastNum === "2" && num !== '12') suffix = "nd";
        else if (lastNum === "3" && num !== '13') suffix = "rd";
        return num + suffix;
    }

    // creates dropdowns based on the number of children the user is planning to have
    const createFutureChildrenYearInputs = () => {
        let currentYear = new Date().getFullYear();
        let years = [];
        for(let i = 0; i < 20; i++) {
            years[i] = parseInt(currentYear) + i;
        }
        let childrenInputs = [];
        for (let i = 0; i < formConditions.plannedNumberOfChildren; i++) {
            childrenInputs.push(
                <div key={i + 1}>
                    <label className="inline dropdown-label"> {numberWithSuffix(i + 1)} </label>
                    <DropdownInput
                        className="inline"
                        onClick={props.updateFutureChildren} 
                        value={props.personalInfo.futureChildren[i]}
                        defaultText='Select Year'
                        name='futureChildren'
                        index={i}
                        options={years}
                    />
                </div>
            );
        }
        return childrenInputs;
    }

    return (
        <div>
            {/* Are you married */}
            <BooleanInput 
                name="isMarried" 
                value={props.personalInfo.isMarried} 
                update={props.update}
                label="Are you married?"
            />

            {/* Do you have any children */}
            <BooleanInput 
                name="currentlyHaveChildren" 
                value={formConditions.currentlyHaveChildren} 
                update={updateFormConditions}
                label="Do you currently have any children?"
            />

            { formConditions.currentlyHaveChildren === 'true' ? 
                 <section>
                    {/* Current number of children */}
                    <NumberInput name='currentNumberOfChildren' 
                        value={props.personalInfo.currentNumberOfChildren} 
                        onClick={props.update} 
                        label="How many children do you currently have?"
                        max={20}
                        min={0}
                    />
                </section>
            : "" }

            { formConditions.currentlyHaveChildren ? 
                <section>
                    {/* Are you planning to have more children */}
                    <BooleanInput 
                        name="planningToHaveChildren" 
                        value={formConditions.planningToHaveChildren} 
                        update={updateFormConditions}
                        label={formConditions.currentlyHaveChildren === 'true' ? "Are you planning on having more children?" : "Are you planning on having children?"}
                    />
                </section>
            : "" }
            
            {/* How many more children */}
            { formConditions.planningToHaveChildren === 'true' ? 
                <section>
                    <NumberInput name='plannedNumberOfChildren' 
                        value={formConditions.plannedNumberOfChildren} 
                        onClick={updateFormConditions} 
                        label="How many children do you plan to have?"
                        max={20}
                        min={0}
                    />
                    { formConditions.plannedNumberOfChildren > 0 ?
                        <section>
                            <label>What year(s) are you planning to have your children?</label>
                            { createFutureChildrenYearInputs() }
                        </section> 
                    : "" }
                </section>
            : "" }
        </div>
    )
}

export default PersonalInfoForm;