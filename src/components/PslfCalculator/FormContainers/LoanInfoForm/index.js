import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import FloatInput from '../../Inputs/FloatInput';
import DropdownInput from '../../Inputs/DropdownInput';
import InputLabel from '../../InputLabel';

const LoanInfoForm = (props) => {

    // Adds or removes loan objects from the loans array within loanInfo
    const updateLoanInfo = (e) => {
        let loanDataClone = cloneDeep(props.loanInfo.loans);
        let loanFormValidationClone = cloneDeep(props.loanInfo.formValidation.loans);
        let operation = typeof e.target.getAttribute === 'function' ? e.target.getAttribute('name') : e.target.name;

        if (operation === 'add') {
            loanDataClone.push({
                type: '',
                principal: '',
                accruedInterest: '',
                interest: ''
            });
            loanFormValidationClone.push({
                type: '',
                principal: '',
                accruedInterest: '',
                interest: ''
            });
        } else if (operation === 'subtract') {
            let index = typeof e.target.getAttribute === 'function' ? e.target.getAttribute('value') : e.target.value;
            loanDataClone.splice(index, 1);
            loanFormValidationClone.splice(index, 1);
        }
        
        let object = {
            target: {
                value: loanDataClone,
                validationValue: loanFormValidationClone,
                name: 'loans'
            }
        }
        props.update(object);
    }

    // Creates the HTML section that contains all the loan inputs
    const createLoanSections = (props) => {
        let loanSections = [];
        for (let i = 0; i < props.loanInfo.loans.length; i++) {
            loanSections.push(
                <section key={`loanSection-${i}`} className="loan-input-section">
                    {/* Loan Type */}
                    <section className="input-section">
                        <InputLabel 
                            label="Loan Type"
                            classes="loan-input-lbl"
                            valid={props.loanInfo.formValidation.loans[i].type}
                        />
                        <DropdownInput 
                            className="inline" 
                            onClick={props.update} 
                            value={props.loanInfo.loans[i].type} 
                            defaultText='Select Type' 
                            name='type' 
                            index={i} 
                            options={['Subsidized', 'Unsubsidized']}
                            size="md"
                            valid={props.loanInfo.formValidation.loans[i].type}
                        />
                    </section>
                    {/* Principal */}
                    <FloatInput 
                        form="loan"
                        label="Loan Principal"
                        value={props.loanInfo.loans[i].principal}
                        name='principal'
                        key={`loanPrincipal-${i}`} 
                        index={i}
                        onChange={props.update}
                        valid={props.loanInfo.formValidation.loans[i].principal}
                    />
                    {/* Accrued Interest */}
                    <FloatInput 
                        form="loan"
                        label="Accrued Interest" 
                        value={props.loanInfo.loans[i].accruedInterest} 
                        name='accruedInterest'
                        key={`accruedInterest-${i}`} 
                        index={i}
                        onChange={props.update}
                        valid={props.loanInfo.formValidation.loans[i].accruedInterest}
                    />
                    <section className="input-section">
                        {/* Interest Rate */}
                        <FloatInput 
                            form="interest"
                            label="Interest Rate (%)"
                            value={props.loanInfo.loans[i].interest} 
                            name='interest'
                            key={`interestRate-${i}`} 
                            index={i}
                            onChange={props.update}
                            valid={props.loanInfo.formValidation.loans[i].interest}
                        />
                        {/* Delete loan buttons. If it is the first loan, puts a transparent place holder in the spot */}
                        { props.loanInfo.loans.length > 1
                            ? <section className="delete-loan-section"><i className="fa fa-trash fa-fw delete-loan-btn" key={`removeLoan-${i}`} onClick={updateLoanInfo} value={i} name="subtract"></i></section> 
                            : <section className="delete-loan-section"><i className="fa fa-trash fa-fw delete-loan-btn-gray" key={`removeLoan-${i}`}></i></section> 
                        }
                    </section>
                    {/* Line break in between loan input sections */}
                    <hr className="loan-line-break"/>
                </section>
            );
        }
        return loanSections
    }


    return (
        <section>
            {/* User loan information section */}
            { createLoanSections(props) }
            <br/>
            <button type="button" className="btn btn-primary add-loan-btn" onClick={updateLoanInfo} name="add"><i className="fa fa-plus-circle fa-fw"></i> Add Another Loan</button>
            <br/>
            {/* If the user is married, ask for the loan amount for their spouse */}
            { props.isMarried.toString() === 'true'
                ? <section className="loan-input-section">
                    <FloatInput 
                        form="loan" 
                        label={`Spouse's Total Loan Balance:`} 
                        value={props.loanInfo.spouseLoanBalance} 
                        name="spouseLoanBalance" 
                        onChange={props.update}
                        valid={props.loanInfo.formValidation.spouseLoanBalance}
                    />
                    <FloatInput 
                        form="loan" 
                        label={`Spouse's Interest Rate (%):`} 
                        value={props.loanInfo.spouseLoanInterestRate} 
                        name="spouseLoanInterestRate" 
                        onChange={props.update}
                        valid={props.loanInfo.formValidation.spouseLoanInterestRate}
                    />
                </section>
                : ""                
            }

            {/* Loan defintions helper text area */}
            <br/>
            <label className="helper-text">*** Loan Principal is the original value of the loan, not including interest.</label><br/>
            <label className="helper-text">*** Accrued Interest is the amount of money your loan value has increased due to interest.</label><br/>
            <label className="helper-text">*** Interest is the yearly interest rate for your loan. </label><br/>
            { props.isMarried.toString() === 'true'
                    ? <label className="helper-text">*** Current Total Loan Balance is the current value of the loan. Loan principal plus the accrued interest. </label>
                    : ""                
            }
        </section>
    )
}

export default LoanInfoForm;