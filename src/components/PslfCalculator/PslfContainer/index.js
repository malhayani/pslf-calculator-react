import React, { useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import DialogueBox from '../DialogueBox';
import CardContainter from '../CardContainer';
import PersonalInfoForm from '../FormContainers/PersonalInfoForm';
import IncomeInfoForm from '../FormContainers/IncomeInfoForm';
import LoanInfoForm from '../FormContainers/LoanInfoForm';
import YearPlanInfoForm from '../FormContainers/YearPlanInfoForm';
import PaymentDetails from '../FormContainers/PaymentDetails';
import { Progress } from 'reactstrap';
import './PslfContainer.css';

// Importing Classes
import TotalLoans from '../../../helpers/TotalLoanData/TotalLoans';
import StandardPaymentPlan from '../../../helpers/PaymentPlans/StandardPaymentPlan';
import RefiPaymentPlan from '../../../helpers/PaymentPlans/RefiPaymentPlan';
import IncomeBasedPaymentPlan from '../../../helpers/PaymentPlans/IncomeBasedPaymentPlan';
import IBRRepaymentSchedule from '../../../helpers/RepaymentSchedules/IBRRepaymentSchedule';
import ICRRepaymentSchedule from '../../../helpers/RepaymentSchedules/ICRRepaymentSchedule';
import PayeRepaymentSchedule from '../../../helpers/RepaymentSchedules/PayeRepaymentSchedule';
import RefiRepaymentSchedule from '../../../helpers/RepaymentSchedules/RefiRepaymentSchedule';
import RepayeRepaymentSchedule from '../../../helpers/RepaymentSchedules/RepayeRepaymentSchedule';
import StandardRepaymentSchedule from '../../../helpers/RepaymentSchedules/StandardRepaymentSchedule';

const PslfContainer = () => {
    // Form Dialogue --- tracks users location within the calculator form
    const [formDialogue, setFormValues] = useState({
        getStarted: false,
        personalInformation: false,
        incomeInformation: false,
        loanInformation: false,
        yearPlanInformation: false,
        progressValue: 0
    });

    // Personal Info State with setter method
    const [personalInfo, setPersonalInfo] = useState({
        isMarried: '',
        currentlyHaveChildren: '',
        planningToHaveChildren: '',
        currentNumberOfChildren: 0,
        plannedNumberOfChildren: 0,
        futureChildren: [],
        formValidation: {
            isMarried: '',
            currentlyHaveChildren: '',
            planningToHaveChildren: '',
            currentNumberOfChildren: '',
            plannedNumberOfChildren: '',
            futureChildren: ''
        }
    });

    // Income Info State with setter method
    const [incomeInfo, setIncomeInfo] = useState({
        lastYearAgi: '',
        thisYearAgi: '',
        nextYearAgi: '',
        spouseAgi: '',
        formValidation: {
            lastYearAgi: '',
            thisYearAgi: '',
            nextYearAgi: '',
            spouseAgi: ''
        }
    });

    // Loan Info State with setter method
    const [ loanInfo, setLoanInfo ] = useState({
        loans: [
            {
                type: '',
                principal: '',
                accruedInterest: '',
                interest: ''
            }
        ],
        spouseLoanBalance: '',
        spouseLoanInterestRate: '',
        formValidation: {
            loans:[ 
                {
                    type: '',
                    principal: '',
                    accruedInterest: '',
                    interest: ''
                }
            ],
            spouseLoanBalance: '',
            spouseLoanInterestRate: ''
        }
    });

    // Object that contains assumed 25 year plan. User can edit
    const [ yearInfo, setYearInfo ] = useState({
        yearPlan: [],
        formValidation: {
            yearPlan: []
        }
    });
    
    const [ loanPaymentData, setLoanPaymentData ] = useState({
        payments: {
            standardPayments: [],
            refiPayments: [],
            payeMFJPayments: [],
            payeMFSPayments: [],
            repayePayments: [],
            ibrMFJPayments: [],
            ibrMFSPayments: [],
            icrMFJPayments: [],
            icrMFSPayments: []
        },
        repaymentSchedules: {
            standardRepaymentSchedule: {},
            refiRepaymentSchedule: {},
            payeMFSRepaymentSchedule: {},
            payeMFJRepaymentSchedule: {},
            repayeRepaymentSchedule: {},
            ibrMFSRepaymentSchedule: {},
            ibrMFJRepaymentSchedule: {},
            icrMFSRepaymentSchedule: {},
            icrMFJRepaymentSchedule: {}
        }
    });

    const REQUIRED_FIELD = 'Required Field';
    const INVALID_INPUT = 'Invalid Input';
    const VALID_INPUT = '';
    const YEARLY_INFLATION = 1.03;
    const TOTAL_YEARS = 26;
    const JOINTLY = 'jointly';
    const SEPARATELY = 'separately';

    const validateMoney = val => {
        // commas and decimals are optional
        const regex = /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/;
        return regex.test(val) ? VALID_INPUT : INVALID_INPUT;
    }

    const validatePercent = val => {
        // commas and decimals are optional
        const regex = /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/;
        return regex.test(val) ? VALID_INPUT : INVALID_INPUT;
    }

    const validateInteger = val => {
        const regex = /^[1-9]\d*$/;
        return regex.test(val) ? VALID_INPUT : INVALID_INPUT;
    }

    // validates personal info form inputs
    const validatePersonalInfoForm = () => {
        let isMarried = personalInfo.isMarried.toString() !== 'true' && personalInfo.isMarried.toString() !== 'false' 
            ? REQUIRED_FIELD 
            : VALID_INPUT;
        let currentlyHaveChildren = personalInfo.currentlyHaveChildren.toString() !== 'true' && personalInfo.currentlyHaveChildren.toString() !== 'false' 
            ? REQUIRED_FIELD 
            : VALID_INPUT;
        let planningToHaveChildren = personalInfo.planningToHaveChildren.toString() !== 'true' && personalInfo.planningToHaveChildren.toString() !== 'false' 
            ? REQUIRED_FIELD 
            : VALID_INPUT;
        let currentNumberOfChildren = personalInfo.currentlyHaveChildren.toString() === 'true' &&  personalInfo.currentNumberOfChildren.toString() === '0' 
            ? INVALID_INPUT 
            : VALID_INPUT;
        let plannedNumberOfChildren = personalInfo.planningToHaveChildren.toString() === 'true' &&  personalInfo.plannedNumberOfChildren.toString() === '0' 
            ? INVALID_INPUT 
            : VALID_INPUT;
        let futureChildren = personalInfo.futureChildren.filter(c => c === '').length > 0 
            ? INVALID_INPUT 
            : VALID_INPUT;
        setPersonalInfo({
            ...personalInfo,
            formValidation: {
                isMarried: isMarried,
                currentlyHaveChildren: currentlyHaveChildren,
                planningToHaveChildren: planningToHaveChildren,
                currentNumberOfChildren: currentNumberOfChildren,
                plannedNumberOfChildren: plannedNumberOfChildren,
                futureChildren: futureChildren
            }
        });
        return !isMarried && !currentlyHaveChildren && !planningToHaveChildren && !currentNumberOfChildren && !plannedNumberOfChildren && !futureChildren;
    }

    // validates income info form inputs
    const validateIncomeInfoForm = () => {
        let lastYearAgi = incomeInfo.lastYearAgi === '' 
            ? REQUIRED_FIELD 
            : validateMoney(incomeInfo.lastYearAgi);
        let thisYearAgi = incomeInfo.thisYearAgi === '' 
            ? REQUIRED_FIELD 
            : validateMoney(incomeInfo.thisYearAgi);
        let nextYearAgi = incomeInfo.nextYearAgi === '' 
            ? REQUIRED_FIELD 
            : validateMoney(incomeInfo.nextYearAgi);
        let spouseAgi = personalInfo.isMarried.toString() === 'true'
            ? incomeInfo.spouseAgi === '' 
                ? REQUIRED_FIELD 
                : validateMoney(incomeInfo.spouseAgi) 
            : VALID_INPUT;
        setIncomeInfo({
            ...incomeInfo,
            formValidation: {
                lastYearAgi: lastYearAgi,
                thisYearAgi: thisYearAgi,
                nextYearAgi: nextYearAgi,
                spouseAgi: spouseAgi
            }
        });
        return !lastYearAgi && !thisYearAgi && !nextYearAgi && !spouseAgi;
    }

    // Validates loan info form inputs
    const validateLoanInfoForm = () => {
        let spouseLoanBalance = personalInfo.isMarried.toString() === 'true'
            ? loanInfo.spouseLoanBalance === '' 
                ? REQUIRED_FIELD
                : validateMoney(loanInfo.spouseLoanBalance) 
            : VALID_INPUT;
        let spouseLoanInterestRate = personalInfo.isMarried.toString() === 'true' 
            ? loanInfo.spouseLoanInterestRate === ''
                ? REQUIRED_FIELD
                : validatePercent(loanInfo.spouseLoanInterestRate) 
            : VALID_INPUT;
        let loanInfoClone = cloneDeep(loanInfo);
        let formValidationLoanInfoClone = cloneDeep(loanInfo.formValidation.loans);
        let isLoansValid = true;
        // Loop through the loan values and assign validation
        for (let i = 0; i < loanInfoClone.loans.length; i++) {
            let loan = loanInfoClone.loans[i];
            formValidationLoanInfoClone[i].type = loan.type === ''
                ? REQUIRED_FIELD
                : VALID_INPUT;
            formValidationLoanInfoClone[i].principal = loan.principal === ''
                ? REQUIRED_FIELD
                : validateMoney(loan.principal);
            formValidationLoanInfoClone[i].accruedInterest = loan.accruedInterest === ''
                ? REQUIRED_FIELD 
                : validateMoney(loan.accruedInterest);
            formValidationLoanInfoClone[i].interest = loan.interest === ''
                ? REQUIRED_FIELD 
                : validatePercent(loan.interest)
            if (formValidationLoanInfoClone[i].type !== '' || formValidationLoanInfoClone[i].principal !== '' || formValidationLoanInfoClone[i].accruedInterest !== '' || formValidationLoanInfoClone[i].interest !== '') isLoansValid = false;
        }
        setLoanInfo({
            ...loanInfo,
            formValidation: {
                loans: formValidationLoanInfoClone,
                spouseLoanBalance: spouseLoanBalance,
                spouseLoanInterestRate: spouseLoanInterestRate
            }
        });
        return !spouseLoanBalance && !spouseLoanInterestRate && isLoansValid;
    }

    const validateYearPlanInfoForm = () => {
        let yearPlanClone = cloneDeep(yearInfo.yearPlan);
        let yearPlanValidationClone = cloneDeep(yearInfo.formValidation.yearPlan);
        let isYearPlanValid = true;

        // loop through each year and validate family size and agi values
        for (let i = 0; i < yearPlanClone.length; i++) {
            let yearPlan = yearPlanClone[i];
            yearPlanValidationClone[i].familySize = yearPlan.familySize === '' 
                ? REQUIRED_FIELD 
                : validateInteger(yearPlan.familySize);
            yearPlanValidationClone[i].agi = yearPlan.agi === '' 
                ? REQUIRED_FIELD 
                : validateMoney(yearPlan.agi);
            yearPlanValidationClone[i].spouseAgi = personalInfo.isMarried.toString() === 'true' 
                ? yearPlan.spouseAgi === '' 
                    ? REQUIRED_FIELD 
                    : validateMoney(yearPlan.spouseAgi)
                : VALID_INPUT;
            if (yearPlanValidationClone[i].familySize !== '' || yearPlanValidationClone[i].agi !== '' || yearPlanValidationClone[i].spouseAgi !== '') isYearPlanValid = false
        }

        setYearInfo({
            ...yearInfo,
            formValidation: {
                yearPlan: yearPlanValidationClone
            }
        });

        return isYearPlanValid;
    }

    // Takes form name and validates form inputs
    const validateFormInputs= e => {
        let formName = e.target.name;
        if (formName === 'personalInformation') {
            if (validatePersonalInfoForm()) updateFormDialogue(e);
        } else if (formName === 'incomeInformation') {
            if (validateIncomeInfoForm()) updateFormDialogue(e);
        } else if (formName === 'loanInformation') {
            if (validateLoanInfoForm()) updateFormDialogue(e);
        } else if (formName === 'yearPlanInformation') {
            if (validateYearPlanInfoForm()) updateFormDialogue(e);
        }
    }

    // Updates the form dialogue
    const updateFormDialogue = e => {

        // Generates an object to reflect the form dialogue booleans
        const createFormValues = (getStarted, personalInformation, incomeInformation, loanInformation, yearPlanInformation, progressValue) => {
            return {
                getStarted,
                personalInformation,
                incomeInformation,
                loanInformation,
                yearPlanInformation,
                progressValue
            };
        }

        // Based on the direction clicked, and the current form index, generates an array of true/false to correctly display card 
        let progressValues = [0, 10, 35, 60, 90, 100];
        let formIndex = e.target.name === 'personalInformation' ? 1 
            : e.target.name === 'incomeInformation' ? 2 
            : e.target.name === 'loanInformation' ? 3 
            : e.target.name === 'yearPlanInformation' ? 4 
            : 0;
        let directionBuffer = e.target.value.toString() === 'false' ? 0 : 1; // false is back, true is next
        let arr = [false, false, false, false, false];
        arr.fill(true, 0, formIndex + directionBuffer);
        
        // Set state form values
        setFormValues({
            ...createFormValues(...arr, progressValues[formIndex + directionBuffer])
        });

        // Calculate Payment Assumptions - if the user is going to the yearPlan form, calculate their year plan
        if (directionBuffer === 1 && formIndex === 3) {
            generateYearPlan();
        // If they were on the year plan form, and went back, clear the year plan
        } else if (directionBuffer === 0 && formIndex === 4) {
            clearYearPlan();
        // They have completed the PSLF form, calculate the information
        } else if (directionBuffer === 1 && formIndex === 4) {
            calculateAssumptions();
        }
    }

    // Helper function to pull name/value/index from event elements
    const getElementAttributes = (target) => {
        // Get the name/value/index attributes. Some parameters are HTML elements, some are just spoofed objects. Need to check where the attribute exists
        let value = typeof target.getAttribute === 'function' ? target.getAttribute('value') : target.value;
        let name = typeof target.getAttribute === 'function' ? target.getAttribute('name') : target.name;
        let index = typeof target.getAttribute === 'function' ? target.getAttribute('index') : target.index;
        return [value, name, index];
    }

    // Updates the personal info state
    const updatePersonalInfo = e => {
        let [value, name, index] = getElementAttributes(e.target);
        // manage changes against the futureChildren array
        if (name === 'futureChildren') {
            let clonedData = cloneDeep(personalInfo[name]);
            clonedData[index] = value;
            setPersonalInfo({
                ...personalInfo, 
                [name]: clonedData
            });
        } else {
            let additionalParameters = {};
            // if user marks currentlyHaveChildren as no, clean up all current children information
            if (name === 'currentlyHaveChildren' && value.toString() === 'false') {
                additionalParameters.currentNumberOfChildren = 0;
            // if user marks planningToHaveChildren as no, clean up all future children information
            } else if (name === 'planningToHaveChildren' && value.toString() === 'false') {
                additionalParameters.plannedNumberOfChildren = 0;
                additionalParameters.futureChildren = [];
            // If user marks married as no, delete all spouse information
            } else if (name === 'isMarried' && value.toString() === 'false') {
                setPersonalInfo({
                    ...personalInfo, 
                    [name]: value
                });
                setIncomeInfo({
                    ...incomeInfo, 
                    spouseAgi: ''
                });
                setLoanInfo({
                    ...loanInfo, 
                    spouseLoanBalance: '',
                    spouseLoanInterestRate: ''
                });
            }
            // Any other attribute, set personalInfo as normal
            setPersonalInfo({
                ...personalInfo, 
                ...additionalParameters,
                [name]: value
            });
        }
    }

    // Manages the personalInfo state when the planned number of children variable changes
    const updateFutureChildrenArray = e => {
        let [numberOfPlannedChildren] = getElementAttributes(e.target);
        let futureChildren = cloneDeep(personalInfo.futureChildren);
        
        if (numberOfPlannedChildren <= 0 || !numberOfPlannedChildren) {
            futureChildren = [];
        } else {
            if (numberOfPlannedChildren > futureChildren.length) { // if the user has increased the number of children, add one to the array
                futureChildren.push('');
            } else if (numberOfPlannedChildren < futureChildren.length) { // if the user has decreased the number of children, remove the last one
                futureChildren.pop();
            }
        }

        setPersonalInfo({
            ...personalInfo,
            plannedNumberOfChildren: numberOfPlannedChildren,
            futureChildren: futureChildren
        });
    }

    // Updates the income info state
    const updateIncomeInfo = e => {
        let [value, name] = getElementAttributes(e.target);
        setIncomeInfo({
            ...incomeInfo, 
            [name]: value
        });
    }

    // Updates the loanInfo state values
    const updateLoanInfo = e => {
        let [value, name, index] = getElementAttributes(e.target);
        if (name === 'spouseLoanBalance' || name === 'spouseLoanInterestRate') {
            setLoanInfo({
                ...loanInfo, 
                [name]: value
            });
        } else if (name === 'loans') {
            let loanInfoClone = cloneDeep(loanInfo);
            loanInfoClone.loans = value;
            loanInfoClone.formValidation.loans = e.target.validationValue;
            setLoanInfo({
                ...loanInfoClone
            });
        } else {
            let loanInfoClone = cloneDeep(loanInfo);
            loanInfoClone.loans[index][name] = value;
            setLoanInfo({
                ...loanInfoClone
            });
        }
    }

    // Clears pslf calculator state and starts over
    const clearPSLFCalculator = () => {
        setFormValues({
            getStarted: false,
            personalInformation: false,
            incomeInformation: false,
            loanInformation: false,
            yearPlanInformation: false,
            progressValue: 0
        });
        setPersonalInfo({
            isMarried: false,
            currentlyHaveChildren: '',
            planningToHaveChildren: '',
            currentNumberOfChildren: 0,
            plannedNumberOfChildren: 0,
            futureChildren: [],
            formValidation: {
                isMarried: '',
                currentlyHaveChildren: '',
                planningToHaveChildren: '',
                currentNumberOfChildren: '',
                plannedNumberOfChildren: '',
                futureChildren: ''
            }
        });
        setIncomeInfo({
            lastYearAgi: '',
            thisYearAgi: '',
            nextYearAgi: '',
            spouseAgi: '',
            formValidation: {
                lastYearAgi: '',
                thisYearAgi: '',
                nextYearAgi: '',
                spouseAgi: ''
            }
        });
        setLoanInfo({
            loans: [
                {
                    type: '',
                    principal: '',
                    accruedInterest: '',
                    interest: ''
                }
            ],
            spouseLoanBalance: '',
            spouseLoanInterestRate: '',
            formValidation: {
                loans:[ 
                    {
                        type: '',
                        principal: '',
                        accruedInterest: '',
                        interest: ''
                    }
                ],
                spouseLoanBalance: '',
                spouseLoanInterestRate: ''
            }
        });
        setYearInfo({
            yearPlan: [],
            formValidation: {
                yearPlan: []
            }
        });
        setLoanPaymentData({
            payments: {
                standardPayments: [],
                refiPayments: [],
                payeMFJPayments: [],
                payeMFSPayments: [],
                repayePayments: [],
                ibrMFJPayments: [],
                ibrMFSPayments: [],
                icrMFJPayments: [],
                icrMFSPayments: []
            },
            repaymentSchedules: {
                standardRepaymentSchedule: {},
                refiRepaymentSchedule: {},
                payeMFSRepaymentSchedule: {},
                payeMFJRepaymentSchedule: {},
                repayeRepaymentSchedule: {},
                ibrMFSRepaymentSchedule: {},
                ibrMFJRepaymentSchedule: {},
                icrMFSRepaymentSchedule: {},
                icrMFJRepaymentSchedule: {}
            }
        });
    }

    // Click event for manipulate the year plan state object.
    const updateYearInfo = (e) => {
        let [value, name, index] = getElementAttributes(e.target);
        let yearPlanClone = cloneDeep(yearInfo.yearPlan);
        for (let i = index; i < TOTAL_YEARS; i++) {
            yearPlanClone[i][name] = (name !== 'familySize' && i !== index) 
                ? parseFloat(yearPlanClone[i - 1][name] * YEARLY_INFLATION).toFixed(2)
                : value;
        }
        setYearInfo({
            ...yearInfo,
            yearPlan: yearPlanClone
        });
    }

    // Creates the Year Plan state object once the users has completed the personal, income, and loan forms. Uses this to populate the year plan form.
    const generateYearPlan = () => {
        let yearPlan = [];
        let yearPlanValidation = [];
        for (let i = 0; i < TOTAL_YEARS; i++) {
            // Determining current loop year. First year is current year minus 1.
            let currentYear = parseInt(new Date().getFullYear() - 1) + i;

            // Determining AGI
            let agi = i === 0 ? cloneDeep(parseFloat(incomeInfo.lastYearAgi))
                : i === 1 ? cloneDeep(parseFloat(incomeInfo.thisYearAgi))
                : i === 2 ? cloneDeep(parseFloat(incomeInfo.nextYearAgi))
                : yearPlan[i - 1].agi * YEARLY_INFLATION; 
            agi = agi || 0.00;
            
            // Determining spouse AGI
            let spouseAgi = i === 0 
                    ? cloneDeep(parseFloat(incomeInfo.spouseAgi))
                    : yearPlan[i - 1].spouseAgi * YEARLY_INFLATION;
            spouseAgi = spouseAgi || 0.00;

            // Determining family size
            let childrenThisYear = personalInfo.futureChildren.filter((year) => (parseInt(year) === parseInt(currentYear))).length;
            let familySize =  i === 0 ? (personalInfo.isMarried === 'true' ? 2 + parseInt(personalInfo.currentNumberOfChildren) : 1 + parseInt(personalInfo.currentNumberOfChildren))
                : parseInt(yearPlan[i - 1].familySize) + parseInt(childrenThisYear);

            yearPlan.push({
                year: parseInt(currentYear),
                familySize: parseInt(familySize),
                agi: parseFloat(agi).toFixed(2),
                spouseAgi: parseFloat(spouseAgi).toFixed(2)
            });
            yearPlanValidation.push({
                year: '',
                familySize: '',
                agi: '',
                spouseAgi: ''
            });
        }
        setYearInfo({
            ...yearInfo,
            yearPlan: yearPlan,
            formValidation: {
                yearPlan: yearPlanValidation
            }
        });
    }

    const clearYearPlan = () => {
        setYearInfo({
            yearPlan: [],
            formValidation: {
                yearPlan: []
            }
        });
    }

    // Generates the payment plans and saves them to the state
    const generatePayments = (currentInfo, totalLoanData, incomePlan) => {
        // STANDARD
        let standardPayments = new StandardPaymentPlan(currentInfo, totalLoanData);
        standardPayments.paymentPlan = standardPayments.calculatePayments();

        // REFI
        let refiPayments = new RefiPaymentPlan(currentInfo, totalLoanData);
        refiPayments.paymentPlan = refiPayments.calculatePayments();

        // PAYE
        let payeMFSPayments = new IncomeBasedPaymentPlan(currentInfo, totalLoanData, SEPARATELY, 0.1, true, incomePlan, standardPayments.paymentPlan);
        payeMFSPayments.paymentPlan = payeMFSPayments.calculatePayments();
        let payeMFJPayments = new IncomeBasedPaymentPlan(currentInfo, totalLoanData, JOINTLY, 0.1, true, incomePlan, standardPayments.paymentPlan);
        payeMFJPayments.paymentPlan = payeMFJPayments.calculatePayments();

        // REPAYE
        let repayePayments = new IncomeBasedPaymentPlan(currentInfo, totalLoanData, JOINTLY, 0.1, false, incomePlan, standardPayments.paymentPlan);
        repayePayments.paymentPlan = repayePayments.calculatePayments();

        // IBR
        let ibrMFSPayments = new IncomeBasedPaymentPlan(currentInfo, totalLoanData, SEPARATELY, 0.15, true, incomePlan, standardPayments.paymentPlan);
        ibrMFSPayments.paymentPlan = ibrMFSPayments.calculatePayments();
        let ibrMFJPayments = new IncomeBasedPaymentPlan(currentInfo, totalLoanData, JOINTLY, 0.15, true, incomePlan, standardPayments.paymentPlan);
        ibrMFJPayments.paymentPlan = ibrMFJPayments.calculatePayments();

        // ICR
        let icrMFSPayments = new IncomeBasedPaymentPlan(currentInfo, totalLoanData, SEPARATELY, 0.2, false, incomePlan, standardPayments.paymentPlan);
        icrMFSPayments.paymentPlan = icrMFSPayments.calculatePayments();
        let icrMFJPayments = new IncomeBasedPaymentPlan(currentInfo, totalLoanData, JOINTLY, 0.2, false, incomePlan, standardPayments.paymentPlan);
        icrMFJPayments.paymentPlan = icrMFJPayments.calculatePayments();

        setLoanPaymentData({
            ...setLoanPaymentData,
            payments: {
                standardPayments: standardPayments.paymentPlan,
                refiPayments: refiPayments.paymentPlan,
                payeMFSPayments: payeMFSPayments.paymentPlan,
                payeMFJPayments: payeMFJPayments.paymentPlan,
                repayePayments: repayePayments.paymentPlan,
                ibrMFSPayments: ibrMFSPayments.paymentPlan,
                ibrMFJPayments: ibrMFJPayments.paymentPlan,
                icrMFSPayments: icrMFSPayments.paymentPlan,
                icrMFJPayments: icrMFJPayments.paymentPlan
            }
        });
    }

    // Generates the repayment schedules and saves them to the state
    const generateRepaymentSchedule = (totalLoanData) => {
        // STANDARD
        let standardRepaymentSchedule = new StandardRepaymentSchedule(loanPaymentData.payments.standardPayments, totalLoanData, loanPaymentData.payments.standardPayments);
        standardRepaymentSchedule.repaymentSchedule = standardRepaymentSchedule.calculateRepaymentSchedule();
        
        // REFI
        let refiRepaymentSchedule = new RefiRepaymentSchedule(loanPaymentData.payments.refiPayments, totalLoanData, loanPaymentData.payments.standardPayments);
        refiRepaymentSchedule.repaymentSchedule = refiRepaymentSchedule.calculateRepaymentSchedule();

        // PAYE
        let payeMFSRepaymentSchedule = new PayeRepaymentSchedule(loanPaymentData.payments.payeMFSPayments, totalLoanData, loanPaymentData.payments.standardPayments);
        payeMFSRepaymentSchedule.repaymentSchedule = payeMFSRepaymentSchedule.calculateRepaymentSchedule();
        let payeMFJRepaymentSchedule = new PayeRepaymentSchedule(loanPaymentData.payments.payeMFJPayments, totalLoanData, loanPaymentData.payments.standardPayments);
        payeMFJRepaymentSchedule.repaymentSchedule = payeMFJRepaymentSchedule.calculateRepaymentSchedule();

        // REPAYE
        let repayeRepaymentSchedule = new RepayeRepaymentSchedule(loanPaymentData.payments.repayePayments, totalLoanData, loanPaymentData.payments.standardPayments);
        repayeRepaymentSchedule.repaymentSchedule = repayeRepaymentSchedule.calculateRepaymentSchedule();

        // IBR
        let ibrMFSRepaymentSchedule = new IBRRepaymentSchedule(loanPaymentData.payments.ibrMFSPayments, totalLoanData, loanPaymentData.payments.standardPayments);
        ibrMFSRepaymentSchedule.repaymentSchedule = ibrMFSRepaymentSchedule.calculateRepaymentSchedule();
        let ibrMFJRepaymentSchedule = new IBRRepaymentSchedule(loanPaymentData.payments.ibrMFJPayments, totalLoanData, loanPaymentData.payments.standardPayments);
        ibrMFJRepaymentSchedule.repaymentSchedule = ibrMFJRepaymentSchedule.calculateRepaymentSchedule();

        // ICR
        let icrMFSRepaymentSchedule = new ICRRepaymentSchedule(loanPaymentData.payments.icrMFSPayments, totalLoanData, loanPaymentData.payments.standardPayments);
        icrMFSRepaymentSchedule.repaymentSchedule = icrMFSRepaymentSchedule.calculateRepaymentSchedule();
        let icrMFJRepaymentSchedule = new ICRRepaymentSchedule(loanPaymentData.payments.icrMFJPayments, totalLoanData, loanPaymentData.payments.standardPayments);
        icrMFJRepaymentSchedule.repaymentSchedule = icrMFJRepaymentSchedule.calculateRepaymentSchedule();

        setLoanPaymentData({
            ...setLoanPaymentData,
            repaymentSchedules: {
                standardRepaymentSchedule: standardRepaymentSchedule.repaymentSchedule,
                refiRepaymentSchedule: refiRepaymentSchedule.repaymentSchedule,
                payeMFSRepaymentSchedule: payeMFSRepaymentSchedule.repaymentSchedule,
                payeMFJRepaymentSchedule: payeMFJRepaymentSchedule.repaymentSchedule,
                repayeRepaymentSchedule: repayeRepaymentSchedule.repaymentSchedule,
                ibrMFSRepaymentSchedule: ibrMFSRepaymentSchedule.repaymentSchedule,
                ibrMFJRepaymentSchedule: ibrMFJRepaymentSchedule.repaymentSchedule,
                icrMFSRepaymentSchedule: icrMFSRepaymentSchedule.repaymentSchedule,
                icrMFJRepaymentSchedule: icrMFJRepaymentSchedule.repaymentSchedule
            }
        });
    }

    // This needs to be re-factored... this needs to be called only after they have signed off on the year plan. Does not need to be called when it currently is.
    const calculateAssumptions = () => {
        /* Formats the year plan object into floats and ints */
        const formattedYearInfo = yearInfo.yearPlan.map(year => {
            return {
                year: parseInt(year.year) || new Date().getFullYear(),
                familySize: parseInt(year.familySize) || 1,
                agi: parseFloat(year.agi) || 0.00,
                spouseAgi: parseFloat(year.spouseAgi) || 0.00
            }
        });

        const currentInfo = {
            isMarried: personalInfo.isMarried.toString() === 'true', // return Boolean version of isMarried variable
            lastYearAgi: parseFloat(incomeInfo.lastYearAgi) || 0, // defaults to 0 if the number cant be parsed
            thisYearAgi: parseFloat(incomeInfo.thisYearAgi) || 0,
            nextYearAgi: parseFloat(incomeInfo.nextYearAgi) || 0,
            spouseAgi: parseFloat(incomeInfo.spouseAgi) || 0,
            spouseLoans: parseFloat(loanInfo.spouseLoanBalance) || 0,
            spouseLoanInterestRate: parseFloat(loanInfo.spouseLoanInterestRate) || 0
        };

        let loanData = cloneDeep(loanInfo.loans);
        loanData = loanData.map(loan => {
            loan.principal = parseFloat(loan.principal) || 0;
            loan.accruedInterest = parseFloat(loan.accruedInterest) || 0;
            loan.interest = parseFloat(loan.interest) || 0;
            loan.totalLoanBalance = (parseFloat(loan.principal) || 0) + (parseFloat(loan.accruedInterest) || 0);
            return loan;
        });

        const totalLoanData = new TotalLoans(loanData);
        generatePayments(currentInfo, totalLoanData, formattedYearInfo);
        generateRepaymentSchedule(totalLoanData);
    }

    return (
        <div className="pslf-calculator">

            <label className="pslf-title">PSLF Calculator</label>

            {/* Progress Bar*/}
            <Progress value={formDialogue.progressValue}/>

            {/* Getting Started Section */}
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

            {/* Personal Information */}
            { formDialogue.getStarted.toString() === 'true' && formDialogue.personalInformation.toString() === 'false' 
                ? <CardContainter 
                    title="Personal Information" 
                    subtitle="Tell us a little bit about yourself." 
                    nextName="personalInformation"
                    next={true} 
                    nextClick={validateFormInputs} 
                    nextText="Next"
                    backName="getStarted"
                    back={true}
                    backClick={updateFormDialogue} 
                    backText="Back">
                    <PersonalInfoForm personalInfo={personalInfo} update={updatePersonalInfo} updateFutureChildren={updateFutureChildrenArray}/>
                </CardContainter>
                : "" }

            {/* Income Information */}
            { formDialogue.personalInformation.toString() === 'true' && formDialogue.incomeInformation.toString() === 'false' 
                ? <CardContainter 
                    title="Income Information" 
                    subtitle="Tell us about your income situation." 
                    nextName="incomeInformation"
                    next={true} 
                    nextClick={validateFormInputs} 
                    nextText="Next"
                    backName="personalInformation"
                    back={true}
                    backClick={updateFormDialogue} 
                    backText="Back">
                    <IncomeInfoForm incomeInfo={incomeInfo} update={updateIncomeInfo} isMarried={personalInfo.isMarried}/>
                </CardContainter>
                : "" }

            {/* Loan Information */}
            { formDialogue.incomeInformation.toString() === 'true' && formDialogue.loanInformation.toString() === 'false' 
                ? <CardContainter 
                    title="Loan Information" 
                    subtitle="Tell us about your student loans." 
                    nextName="loanInformation"
                    next={true} 
                    nextClick={validateFormInputs} 
                    nextText="Next"
                    backName="incomeInformation"
                    back={true}
                    backClick={updateFormDialogue} 
                    backText="Back">
                    <LoanInfoForm loanInfo={loanInfo} update={updateLoanInfo} isMarried={personalInfo.isMarried}/>
                </CardContainter>
                : "" }

            {/* Assumption Table */}
            { formDialogue.loanInformation.toString() === 'true' && formDialogue.yearPlanInformation.toString() === 'false' 
                ? <CardContainter 
                    title="Confirm Everything Looks Good" 
                    subtitle="We made some assumptions about the next 25 years based on your inputs. If something looks wrong, please correct it." 
                    nextName="yearPlanInformation"
                    next={true} 
                    nextClick={validateFormInputs} 
                    nextText="Finish"
                    backName="loanInformation"
                    back={true}
                    backClick={updateFormDialogue} 
                    backText="Back">
                    <YearPlanInfoForm yearInfo={yearInfo} update={updateYearInfo} isMarried={personalInfo.isMarried}/>
                </CardContainter>
                : "" }

            {/* PSLF Data Section */}
            { formDialogue.yearPlanInformation.toString() === 'true' 
                ? <CardContainter 
                    title="Payment Details" 
                    subtitle="Based on the information you provided, here are your payment plan details." 
                    nextName="yearPlanInformation"
                    next={true} 
                    nextClick={() => {}} 
                    nextText=""
                    backName="yearPlanInformation"
                    back={true}
                    backClick={clearPSLFCalculator} 
                    backText="Start Over">
                    <PaymentDetails payments={loanPaymentData} isMarried={personalInfo.isMarried}/>
                </CardContainter>
                : "" 
            }

        </div>
    );
}

export default PslfContainer;