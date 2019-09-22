import React, { useState } from 'react';
import DialogueBox from '../DialogueBox';
import CardContainter from '../CardContainer';
import PersonalInfoForm from '../PersonalInfoForm';
import IncomeInfoForm from '../IncomeInfoForm';
import LoanInfoForm from '../LoanInfoForm';
import ConfirmationForm from '../ConfirmationForm';
import { Progress } from 'reactstrap';
import './PslfContainer.css';

const PslfContainer = () => {

    // Form Dialogue --- tracks users location within the calculator form
    const [formDialogue, setFormValues] = useState({
        getStarted: false,
        personalInformation: false,
        incomeInformation: false,
        loanInformation: false,
        confirmation: false,
        progressValue: 0
    });

    // Personal Info State with setter method
    const [personalInfo, setPersonalInfo] = useState({
        isMarried: false,
        currentNumberOfChildren: 0,
        futureChildren: []
    });

    // Income Info State with setter method
    const [incomeInfo, setIncomeInfo] = useState({
        lastYearAgi: '',
        thisYearAgi: '',
        nextYearAgi: '',
        spouseAgi: ''
    });

    // Updates the form dialogue
    const updateFormDialogue = e => {
        let formDialogueClone = JSON.parse(JSON.stringify(formDialogue));

        // back was clicked
        if (e.target.value.toString() === 'false') {
            if (e.target.name === 'getStarted') { // back was clicked on the personal information screen
                formDialogueClone.getStarted = false;
                formDialogueClone.personalInformation = false;
                formDialogueClone.incomeInformation = false;
                formDialogueClone.loanInformation = false;
                formDialogueClone.confirmation = false;
                formDialogueClone.progressValue = 0;
            } else if (e.target.name === 'personalInformation') { // back was clicked on the income information screen
                formDialogueClone.personalInformation = false;
                formDialogueClone.incomeInformation = false;
                formDialogueClone.loanInformation = false;
                formDialogueClone.confirmation = false;
                formDialogueClone.progressValue = 10;
            } else if (e.target.name === 'incomeInformation') {  // back was clicked on the loan information screen
                formDialogueClone.incomeInformation = false;
                formDialogueClone.loanInformation = false;
                formDialogueClone.confirmation = false;
                formDialogueClone.progressValue = 35;
            } else if (e.target.name === 'loanInformation') {  // back was clicked on the confirmation screen
                formDialogueClone.loanInformation = false;
                formDialogueClone.confirmation = false;
                formDialogueClone.progressValue = 60;
            } 
        // next was clicked
        } else {
            if (e.target.name === 'getStarted') {
                formDialogueClone.getStarted = true;
                formDialogueClone.progressValue = 10;
            } else if  (e.target.name === 'personalInformation') {
                formDialogueClone.getStarted = true;
                formDialogueClone.personalInformation = true;
                formDialogueClone.progressValue = 35;
            } else if  (e.target.name === 'incomeInformation') {
                formDialogueClone.getStarted = true;
                formDialogueClone.personalInformation = true;
                formDialogueClone.incomeInformation = true;
                formDialogueClone.progressValue = 60;
            } else if (e.target.name === 'loanInformation') {
                formDialogueClone.getStarted = true;
                formDialogueClone.personalInformation = true;
                formDialogueClone.incomeInformation = true;
                formDialogueClone.loanInformation = true;
                formDialogueClone.progressValue = 90;
            } else if (e.target.name === 'confirmation') {
                formDialogueClone.getStarted = true;
                formDialogueClone.personalInformation = true;
                formDialogueClone.incomeInformation = true;
                formDialogueClone.loanInformation = true;
                formDialogueClone.confirmation = true;
                formDialogueClone.progressValue = 100;
            }
        }

        setFormValues({
            ...formDialogueClone
        });
    }

    // Updates the personal info state
    const updatePersonalInfo = e => {
        let value = e.target.hasOwnProperty('value') 
            ? e.target.value
            : e.target.getAttribute('value');
        let name = e.target.hasOwnProperty('name') 
            ? e.target.name
            : e.target.getAttribute('name');
        setPersonalInfo({
            ...personalInfo, 
            [name]: value
        });
    }

    // Handles updating the personal info state future children array
    const updateFutureChildren = e => {
        let value = e.target.hasOwnProperty('value') 
        ? e.target.value
        : e.target.getAttribute('value');
        let name = e.target.hasOwnProperty('name') 
            ? e.target.name
            : e.target.getAttribute('name');
        let index = e.target.getAttribute('index');
        let clonedData = JSON.parse(JSON.stringify(personalInfo[name]));
        clonedData[index] = value;
        value = clonedData;

        setPersonalInfo({
            ...personalInfo, 
            [name]: value
        });
    }

    // Updates the income info state
    const updateIncomeInfo = e => {
        let value = e.target.hasOwnProperty('value') 
        ? e.target.value
        : e.target.getAttribute('value');
        let name = e.target.hasOwnProperty('name') 
            ? e.target.name
            : e.target.getAttribute('name');
        setIncomeInfo({
            ...incomeInfo, 
            [name]: value
        });
    }

    // clears pslf calculator and starts over
    const clearPSLFCalculator = () => {
        setFormValues({
            getStarted: false,
            personalInformation: false,
            incomeInformation: false,
            loanInformation: false,
            confirmation: false,
            progressValue: 0
        });
        setPersonalInfo({
            isMarried: false,
            currentNumberOfChildren: 0,
            futureChildren: []
        });
    }

    return (
        <div className="pslf-calculator">

            <label className="pslf-title">PSLF Calculator</label>

            <Progress value={formDialogue.progressValue}/>

            { formDialogue.getStarted.toString() === 'false' 
                ? <CardContainter 
                    title="" 
                    subtitle="" 
                    nextName="getStarted"
                    next={true} 
                    nextClick={updateFormDialogue} 
                    nextText="Start"
                    backName=""
                    back={false} 
                    backClick={() => {}}
                    backText="Back">
                    <DialogueBox name="getStarted" msg="Let's get started!"/>
                </CardContainter>
                : "" }

            { formDialogue.getStarted.toString() === 'true' && formDialogue.personalInformation.toString() === 'false' 
                ? <CardContainter 
                    title="Personal Information" 
                    subtitle="Tell us a little bit about yourself!" 
                    nextName="personalInformation"
                    next={true} 
                    nextClick={updateFormDialogue} 
                    nextText="Next"
                    backName="getStarted"
                    back={true}
                    backClick={updateFormDialogue} 
                    backText="Back">
                    <PersonalInfoForm personalInfo={personalInfo} update={updatePersonalInfo} updateFutureChildren={updateFutureChildren}/>
                </CardContainter>
                : "" }

            { formDialogue.personalInformation.toString() === 'true' && formDialogue.incomeInformation.toString() === 'false' 
                ? <CardContainter 
                    title="Income Information" 
                    subtitle="Tell us about your income situation!" 
                    nextName="incomeInformation"
                    next={true} 
                    nextClick={updateFormDialogue} 
                    nextText="Next"
                    backName="personalInformation"
                    back={true}
                    backClick={updateFormDialogue} 
                    backText="Back">
                    <IncomeInfoForm incomeInfo={incomeInfo} update={updateIncomeInfo} isMarried={personalInfo.isMarried}/>
                </CardContainter>
                : "" }

            { formDialogue.incomeInformation.toString() === 'true' && formDialogue.loanInformation.toString() === 'false' 
                ? <CardContainter 
                    title="Loan Information" 
                    subtitle="Tell us about your student loans!" 
                    nextName="loanInformation"
                    next={true} 
                    nextClick={updateFormDialogue} 
                    nextText="Next"
                    backName="incomeInformation"
                    back={true}
                    backClick={updateFormDialogue} 
                    backText="Back">
                    <LoanInfoForm />
                </CardContainter>
                : "" }

            { formDialogue.loanInformation.toString() === 'true' && formDialogue.confirmation.toString() === 'false' 
                ? <CardContainter 
                    title="Confirm Everything Looks Good" 
                    subtitle="We made some assumptions about the next 20 years based on your inputs. If something looks wrong, please correct it!" 
                    nextName="confirmation"
                    next={true} 
                    nextClick={updateFormDialogue} 
                    nextText="Finish"
                    backName="loanInformation"
                    back={true}
                    backClick={updateFormDialogue} 
                    backText="Back">
                    <ConfirmationForm />
                </CardContainter>
                : "" }

            { formDialogue.confirmation.toString() === 'true' 
                ? <div>
                    <label>TBD - Show PSLF Data</label>
                    <button className="btn btn-primary start-over-btn" onClick={clearPSLFCalculator}>Start Over</button>
                </div>
                : "" 
            }

        </div>
    );
}

export default PslfContainer;