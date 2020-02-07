import React from 'react';
import BooleanInput from '../../Inputs/BooleanInput';
import IntegerCounterInput from '../../Inputs/IntegerCounterInput';
import DropdownInput from '../../Inputs/DropdownInput';
import InputLabel from '../../InputLabel';

const PersonalInfoForm = (props) => {

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
        for (let i = 0; i < props.personalInfo.plannedNumberOfChildren; i++) {
            childrenInputs.push(
                <div key={i + 1}>
                    <label className="inline dropdown-label"> {numberWithSuffix(i + 1)} </label>
                    <DropdownInput
                        className="inline"
                        onClick={props.update} 
                        value={props.personalInfo.futureChildren[i]}
                        defaultText='Select Year'
                        name='futureChildren'
                        index={i}
                        options={years}
                        size="sm"
                        valid={props.personalInfo.formValidation.futureChildren}
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
                valid={props.personalInfo.formValidation.isMarried}
            />
            {/* Do you have any children */}
            <BooleanInput 
                name="currentlyHaveChildren" 
                value={props.personalInfo.currentlyHaveChildren} 
                update={props.update}
                label="Do you currently have any children?"
                valid={props.personalInfo.formValidation.currentlyHaveChildren}
            />
            { props.personalInfo.currentlyHaveChildren === 'true' ? 
                 <section className="integer-input-section">
                    {/* Current number of children */}
                    <IntegerCounterInput name='currentNumberOfChildren' 
                        value={props.personalInfo.currentNumberOfChildren} 
                        onClick={props.update} 
                        label="How many children do you currently have?"
                        max={20}
                        min={0}
                        valid={props.personalInfo.formValidation.currentNumberOfChildren}
                    />
                </section>
            : "" }

            { props.personalInfo.currentlyHaveChildren ? 
                <section>
                    {/* Are you planning to have more children */}
                    <BooleanInput 
                        name="planningToHaveChildren" 
                        value={props.personalInfo.planningToHaveChildren} 
                        update={props.update}
                        label={props.personalInfo.currentlyHaveChildren === 'true' ? "Are you planning on having more children?" : "Are you planning on having children?"}
                        valid={props.personalInfo.formValidation.planningToHaveChildren}
                    />
                </section>
            : "" }
            
            {/* How many more children */}
            { props.personalInfo.planningToHaveChildren === 'true' ? 
                <section>
                    <section className="integer-input-section">
                        <IntegerCounterInput name='plannedNumberOfChildren' 
                            value={props.personalInfo.plannedNumberOfChildren} 
                            onClick={props.updateFutureChildren} 
                            label="How many children do you plan to have?"
                            max={20}
                            min={0}
                            valid={props.personalInfo.formValidation.plannedNumberOfChildren}
                        />
                    </section>
                    { props.personalInfo.plannedNumberOfChildren > 0 ?
                        <section className="input-section">
                            <InputLabel 
                                label="What year(s) are you planning to have your children?"
                                valid={props.personalInfo.formValidation.futureChildren}
                            />
                            { createFutureChildrenYearInputs() }
                        </section> 
                    : "" }
                </section>
            : "" }
        </div>
    )
}

export default PersonalInfoForm;