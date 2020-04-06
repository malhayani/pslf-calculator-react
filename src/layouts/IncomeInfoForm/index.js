import React from 'react';
import FloatInput from '../../components/FloatInput'

const IncomeInfoForm = (props) => {
    const thisYear = new Date().getFullYear();
    const lastYear = parseInt(thisYear) - 1;
    const nextYear = parseInt(thisYear) + 1;

    return (
        <section>
            <FloatInput 
                form="income" 
                label={`AGI for ${lastYear} (Last Year):`} 
                value={props.incomeInfo.lastYearAgi} 
                name="lastYearAgi" 
                onChange={props.update}
                valid={props.incomeInfo.formValidation.lastYearAgi}
            />
            <FloatInput 
                form="income" 
                label={`Expected AGI for ${thisYear} (This Year):`} 
                value={props.incomeInfo.thisYearAgi} 
                name="thisYearAgi" 
                onChange={props.update}
                valid={props.incomeInfo.formValidation.thisYearAgi}
            />
            <FloatInput 
                form="income" 
                label={`Expected AGI for ${nextYear} (Next Year):`} 
                value={props.incomeInfo.nextYearAgi} 
                name="nextYearAgi" 
                onChange={props.update}
                valid={props.incomeInfo.formValidation.nextYearAgi}
            />

            { props.isMarried.toString() === 'true'
                ? <FloatInput 
                    form="income" 
                    label={`Spouse's AGI for ${lastYear} (Last Year):`} 
                    value={props.incomeInfo.spouseAgi} 
                    name="spouseAgi" 
                    onChange={props.update}
                    valid={props.incomeInfo.formValidation.spouseAgi}
                />
                : ""                
            }
            <br/>
            <hr className="loan-line-break"/>
            <label className="helper-text">DEFINITIONS:</label><br/>
            <label className="helper-text"><b>AGI</b> is adjusted gross income. AGI is your total gross income excluding specific deductions</label>
            <br/><br/>
        </section>
    )
}

export default IncomeInfoForm;