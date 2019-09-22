import React from 'react';
import MoneyInput from '../MoneyInput'

const IncomeInfoForm = (props) => {
    const thisYear = new Date().getFullYear();
    const lastYear = parseInt(thisYear) - 1;
    const nextYear = parseInt(thisYear) + 1;

    return (
        <section>
            <label className="income-section-header">Please enter the following information about your income</label>
            
            <MoneyInput label={`Your AGI for ${lastYear}:`} value={props.incomeInfo.lastYearAgi} name="lastYearAgi" onChange={props.update}/>
            <MoneyInput label={`Your expected AGI for ${thisYear}:`} value={props.incomeInfo.thisYearAgi} name="thisYearAgi" onChange={props.update}/>
            <MoneyInput label={`Your expected AGI for ${nextYear}:`} value={props.incomeInfo.nextYearAgi} name="nextYearAgi" onChange={props.update}/>

            { props.isMarried.toString() === 'true'
                ? <MoneyInput label={`Your Spouse's expected AGI for ${thisYear}:`} value={props.incomeInfo.lastYearAgi} name="spouseAgi" onChange={props.update}/>
                : ""                
            }
            <label className="helper-text">*** AGI is adjusted gross income. AGI is your total gross income excluding specific deductions. </label>
        </section>
    )
}

export default IncomeInfoForm;