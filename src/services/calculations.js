const inputs = require('./inputs');
const payments = require('./payments');

/* ----------------------- START LOAN CALCULATIONS ----------------------------*/
/* -------- MONTHLY INTEREST CHARGE ---------- */
// PAYE, REPAYE, IBR, ICR
const monthlyInterestCharge = (previousMonth, first) => {
    if (first) return inputs.totalLoanInfo.principal * inputs.totalLoanInfo.interest / 12;
    else {
        let payment = previousMonth.loanPrincipal * inputs.totalLoanInfo.interest / 12;
        return Math.max(payment, 0);
    }
}
// REFI & STANDARD
const standardRefiMonthlyInterestCharge = (previousMonth, first, interest) => {
    if (first) return inputs.totalLoanInfo.loanBalance * (interest / 12);
    return previousMonth.loanPrincipal * (interest / 12);
}

/* -------- UNPAID INTEREST ---------- */
// PAYE, REPAYE, IBR, ICR
const unpaidInterest = (currentMonth) => {
    return currentMonth.monthlyInterestCharge - currentMonth.actualMonthlyPayment;
}

/* -------- CAPITALIZE INTEREST ---------- */
// PAYE, REPAYE, IBR, ICR
const capitalizeInterest = (currentMonth, first) => {
    if (first) return false
    else return (currentMonth.actualMonthlyPayment >= payments.standardPayments[0]);
}

/* -------- HAS INTEREST CAPITALIZED ---------- */
// PAYE, REPAYE, IBR, ICR
const hasInterestCapitlized = (currentMonth, first) => {
    if (first) return (currentMonth.loanPrincipal - inputs.totalLoanInfo.principal != 0);
    else return (currentMonth.loanPrincipal != inputs.totalLoanInfo.principal);
}

/* -------- TOTAL PAYMENTS ---------- */
// PAYE, REPAYE, IBR, ICR, STANDARD
const totalPayments = (currentMonth, previousMonth, first) => {
    if (first) return currentMonth.actualMonthlyPayment;
    else return currentMonth.actualMonthlyPayment + previousMonth.totalPayments;
}

/* ----------- ACTUAL MONTHLY PAYMENTS ---------*/
// PAYE & IBR
const payeIbrActualMonthlyPayment = (payment, currentMonth, previousMonth, first) => {
    let actualMonthlyPayment = currentMonth.monthlyInterestCharge === 0 ? 0 : payment;
    if (first) return actualMonthlyPayment;
    else return Math.min(actualMonthlyPayment, previousMonth.loanPrincipal);
} 
// REPAYE & ICR
const repayeIcrActualMonthlyPayment = (payment, currentMonth) => {
    return currentMonth.monthlyInterestCharge === 0 ? 0 : payment;
}

// REFI
const refiActualMonthlyPayment = (payment, month, previousMonth, first) => {
    if (first) return payment;
    let val = month.monthlyInterestCharge !== 0 ? payment : 0;
    return Math.min(val, previousMonth.loanPrincipal);
}

/* --------- LOAN PRINCIPAL --------------*/
// PAYE
const payeLoanPrincipal = (currentMonth, previousMonth, first) => {
    if (first) return inputs.totalLoanInfo.principal;
    else {
        let val = 0;
        const condition = currentMonth.capitalizeInterest && !previousMonth.hasInterestCapitlized;
        val = condition 
            ? previousMonth.loanPrincipal + (0.1 * inputs.totalLoanInfo.principal) 
            : previousMonth.loanPrincipal;     
        val = currentMonth.accruingInterest === 0 
            ? val + currentMonth.unpaidInterest 
            : val;
        return val > 0.01 ? val : 0;
    }
}
// REPAYE
const repayeLoanPrincipal = (currentMonth, previousMonth, first) => {
    if (first) return inputs.totalLoanInfo.principal;
    else {
        let val = currentMonth.accruingInterest === 0
            ? previousMonth.loanPrincipal + currentMonth.unpaidInterest
            : previousMonth.loanPrincipal
        return val > 0.01 ? val : 0;
    }
}
// IBR
const ibrLoanPrincipal = (currentMonth, previousMonth, first) => {
    if (first) return inputs.totalLoanInfo.principal;
    else {
        let val = 0;
        if (currentMonth.accruingInterest === 0) {
            val = currentMonth.capitalizeInterest && !previousMonth.hasInterestCapitlized 
                ? previousMonth.loanPrincipal + previousMonth.accruingInterest + currentMonth.unpaidInterest
                : previousMonth.loanPrincipal + currentMonth.unpaidInterest;  
        } else {
            val = currentMonth.capitalizeInterest && previousMonth.hasInterestCapitlized 
                ? previousMonth.loanPrincipal + currentMonth.accruingInterest
                : previousMonth.loanPrincipal;
        }
        return val > 0.01 ? val : 0;
    }
}
// ICR
const icrLoanPrincipal = (currentMonth, previousMonth, first) => {
    if (first) return inputs.totalLoanInfo.principal;
    else {
        let val = 0;
        if (currentMonth.unpaidInterest > 0) {
            val = previousMonth.loanPrincipal;
        } else if (inputs.totalLoanInfo.principal === previousMonth.loanPrincipal) {
            val = previousMonth.loanPrincipal + previousMonth.accruingInterest;
        } else if (previousMonth.accruingInterest === 0) {
            val = previousMonth.loanPrincipal + previousMonth.unpaidInterest;
        } else if (previousMonth.accruingInterest > 0) {
            val = previousMonth.loanPrincipal;
        }
        return val > 0.01 ? val : 0;
    }
}
// STANDARD
const standardLoanPrincipal = (month, previousMonth, first) => {
    if (first) return inputs.totalLoanInfo.loanBalance + month.unpaidInterest;
    let val = previousMonth.loanPrincipal + month.unpaidInterest;
    return val > 0.01 ? val : 0;
}

/* ------------- ACCRUING INTEREST --------------*/
// PAYE
const payeAccruingInterest = (currentMonth, previousMonth, first) => {
    if (first) return (Math.max(0, currentMonth.unpaidInterest) + inputs.totalLoanInfo.accruedInterest);
    else {
        const condition = currentMonth.capitalizeInterest && !previousMonth.hasInterestCapitlized;
        let val = (condition) 
            ? currentMonth.unpaidInterest + previousMonth.accruingInterest - (0.1 * inputs.totalLoanInfo.principal)
            : currentMonth.unpaidInterest + previousMonth.accruingInterest;
        return Math.max(0, val);
    }
}
// REPAYE
const repayeAccruingInterest = (currentMonth, previousMonth, first) => {
    if (first) return inputs.totalLoanInfo.accruedInterest;
    let val = currentMonth.unpaidInterest > 0
        ? (currentMonth.unpaidInterest * 0.5) +  previousMonth.accruingInterest
        : currentMonth.unpaidInterest +  previousMonth.accruingInterest;
    return Math.max(0, val);
} 
// IBR
const ibrAccruingInterest = (currentMonth, previousMonth, first) => {
    if (first) {
        let val = 0;
        if (currentMonth.unpaidInterest > 0) val = currentMonth.unpaidInterest;
        else {
            val = inputs.totalLoanInfo.principal === currentMonth.loanPrincipal
                ? val - (inputs.totalLoanInfo.principal * 0.01)
                : currentMonth.unpaidInterest;
        }
        return (val > 0.01 ? val : 0) + inputs.totalLoanInfo.accruedInterest;
    } else {
        let val = currentMonth.capitalizeInterest && !previousMonth.hasInterestCapitlized
            ? 0
            : currentMonth.unpaidInterest + previousMonth.accruingInterest;
        return val > 0.01 ? val : 0;
    }
}
// ICR
const icrAccruingInterest = (currentMonth, previousMonth, first) => {
    if (first) {
        let val = inputs.totalLoanInfo.principal === currentMonth.loanPrincipal
            ? 0 - (inputs.totalLoanInfo.principal * 0.1) 
            : currentMonth.unpaidInterest;
        return Math.max(val, 0) + inputs.totalLoanInfo.accruedInterest;
    } else {
        let val = 0;
        if (previousMonth.accruingInterest + currentMonth.unpaidInterest > 0) {
            if (currentMonth.unpaidInterest > 0) {
                val = currentMonth.unpaidInterest + previousMonth.accruingInterest;
            } else {
                if (!(inputs.totalLoanInfo.principal === previousMonth.loanPrincipal)) {
                    val = currentMonth.unpaidInterest + previousMonth.accruingInterest;
                }
            }
        }
        return Math.max(0, val);
    }
}
/* ----------------------- END LOAN CALCULATIONS ----------------------------*/

/* INIT DATA STRUCTURE  */
const initDataStructure = (capitalize, length, accruing) => {
    let data = new Array(length);
    for (let c = 0; c < data.length; c++) {
        data[c] = [];
        for (let i = 0; i < 12; i++) {
            let obj = {
                payment: (c * 12) + (i + 1),
                monthlyInterestCharge: 0,
                actualMonthlyPayment: 0,
                unpaidInterest: 0,
                loanPrincipal: 0,
                totalPayments: 0
            }
            if (capitalize) {
                obj.capitalizeInterest = false;
                obj.hasInterestCapitlized = false;
            }
            if (accruing) {
                obj.accruingInterest = 0
            }
            data[c].push(obj)
        }
    }
    return data;
}

/* CALCULATE LOAN INFORMATION */
const calculateLoanInformation = (type, payments, size, capitalize) => {
    let data = initDataStructure(capitalize, size, (type === 'standard' ? false : true));
    let previousMonth = {};
    data.forEach((year, yIndex) => {
        year.forEach((month, mIndex) => {
            const first = (yIndex === 0 && mIndex === 0);
            // Monthly Interest Charge
            if (type === 'standard') month.monthlyInterestCharge = standardRefiMonthlyInterestCharge(previousMonth, first, inputs.totalLoanInfo.interest);
            else if (type === 'refi') month.monthlyInterestCharge = standardRefiMonthlyInterestCharge(previousMonth, first, inputs.refiInfo.interest);
            else month.monthlyInterestCharge = monthlyInterestCharge(previousMonth, first);

            // Actual Monthly Payment
            if (type === 'paye') month.actualMonthlyPayment = payeIbrActualMonthlyPayment(payments[yIndex], month, previousMonth, first)
            else if (type === 'repaye') month.actualMonthlyPayment = repayeIcrActualMonthlyPayment(payments[yIndex], month);
            else if (type === 'ibr') month.actualMonthlyPayment = payeIbrActualMonthlyPayment(payments[yIndex], month, previousMonth, first);
            else if (type === 'icr') month.actualMonthlyPayment = repayeIcrActualMonthlyPayment(payments[yIndex], month);
            else if (type === 'standard') month.actualMonthlyPayment = payments[yIndex];
            else if (type === 'refi') month.actualMonthlyPayment = refiActualMonthlyPayment(payments[yIndex], month, previousMonth, first)

            // Capitalize Interest
            if (capitalize) month.capitalizeInterest = capitalizeInterest(month, first);

            // Unpaid Interest
            month.unpaidInterest = unpaidInterest(month);

            // Accruing Interest
            if (type === 'paye') month.accruingInterest = payeAccruingInterest(month, previousMonth, first);
            else if (type === 'repaye') month.accruingInterest = repayeAccruingInterest(month, previousMonth, first);
            else if (type === 'ibr') month.accruingInterest = ibrAccruingInterest(month, previousMonth, first);
            else if (type === 'icr') month.accruingInterest = icrAccruingInterest (month, previousMonth, first);

            // Loan Principal
            if (type === 'paye') month.loanPrincipal = payeLoanPrincipal(month, previousMonth, first);
            else if (type === 'repaye') month.loanPrincipal = repayeLoanPrincipal(month, previousMonth, first);
            else if (type === 'ibr') month.loanPrincipal = ibrLoanPrincipal(month, previousMonth, first);
            else if (type === 'icr') month.loanPrincipal = icrLoanPrincipal(month, previousMonth, first);
            else if (type === 'standard' || type === 'refi') month.loanPrincipal = standardLoanPrincipal(month, previousMonth, first);

            // Has Interest Capitalized
            if (capitalize) month.hasInterestCapitlized = hasInterestCapitlized(month, first);

            // Total Payments
            month.totalPayments = totalPayments(month, previousMonth, first);

            // Save current month as previous month for next iteration
            previousMonth = month;
        });
    });
    return data;
}
const payeMFJData = calculateLoanInformation('paye', payments.payeMFJPayments, 20, true);
const payeMFSData = calculateLoanInformation('paye', payments.payeMFSPayments, 20, true);
const repayeData = calculateLoanInformation('repaye', payments.repayePayments, 25, false);
const ibrMFJData = calculateLoanInformation('ibr', payments.ibrMFJPayments, 25, true);
const ibrMFSData = calculateLoanInformation('ibr', payments.ibrMFSPayments, 25, true);
const icrMFJData = calculateLoanInformation('icr', payments.icrMFJPayments, 25, false);
const icrMFSData = calculateLoanInformation('icr', payments.icrMFSPayments, 25, false);
const standardData = calculateLoanInformation('standard', payments.standardPayments, 10, false);
const refiData = calculateLoanInformation('refi', payments.refiPayments, 20, false);

module.exports = {
    payeMFJData: payeMFJData,
    payeMFSData: payeMFSData,
    repayeData: repayeData,
    ibrMFJData: ibrMFJData,
    ibrMFSData: ibrMFSData,
    icrMFJData: icrMFJData,
    icrMFSData: icrMFSData,
    standardData: standardData,
    refiData: refiData
}
