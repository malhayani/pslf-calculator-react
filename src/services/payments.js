const inputs = require('./inputs');

/* Calculates the standard loan repayment */
const paymentFunction = (avgInt, duration, balance) => {
    let val = Math.abs((balance * (avgInt / 12)) / (1 - Math.pow((1 + (avgInt / 12)), duration)));
    return val ? val : 0.00;
}

// Object that contains static standard payment for user and spouse
const standardRepayments = {
    payment: paymentFunction(inputs.totalLoanInfo.interest, -120, (0 - inputs.totalLoanInfo.loanBalance)),
    spousePayment: paymentFunction(inputs.currentInfo.spouseLoanInterestRate, -120, (0 - inputs.currentInfo.spouseLoans)),
}

// Creating an array of 10 standard payments 
let standardPayments = new Array(10);
standardPayments = standardPayments.fill(standardRepayments.payment, 0, 10); // check if Standard does not matter if you're married

// Creating an array of 10 refi payments 
let refiPayments = new Array(20);
let refiPayment = paymentFunction(inputs.refiInfo.interest, -(inputs.refiInfo.term * 12), (0 - inputs.totalLoanInfo.loanBalance));
refiPayments = refiPayments.fill(refiPayment, 0, 20);

/* Calculates payment information for all payment plans except Standard and Refi */
const paymentCalculation = (filingStatus, multiplier, compareStandard) => {
    return inputs.yearPlan.map(year => {
        const incomeCalc = filingStatus === 'jointly' ? year.agi + year.spouseAgi : year.agi;
        const povertyCalc = inputs.povertyInfo.guideline + (year.familySize - 1) * inputs.povertyInfo.perPerson;
        const principalCalc = filingStatus === 'jointly' ? inputs.totalLoanInfo.principal/(inputs.totalLoanInfo.principal + inputs.currentInfo.spouseLoans) : 1;
        let payment = multiplier * (incomeCalc - 1.5 * (povertyCalc)) / 12 * principalCalc;
        payment = payment > 0 ? payment : 0;
        if (compareStandard) payment = payment > standardPayments[0] ? standardPayments[0] : payment;
        return parseFloat(payment.toFixed(7));
    });
}

module.exports = {
    standardPayments: standardPayments,
    refiPayments: refiPayments,
    payeMFJPayments: paymentCalculation('jointly', 0.1, true),
    payeMFSPayments: paymentCalculation('single', 0.1, true),
    repayePayments: paymentCalculation('jointly', 0.1, false),
    ibrMFJPayments: paymentCalculation('jointly', 0.15, true),
    ibrMFSPayments: paymentCalculation('single', 0.15, true),
    icrMFJPayments: paymentCalculation('jointly', 0.2, false),
    icrMFSPayments: paymentCalculation('single', 0.2, false)
}