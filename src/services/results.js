const calculations = require('./calculations');

/* Generates results table for each payment method */
const getResults = (calc) => {
    let results = [];
    for (let i = 0; i < 10; i++) {
        let row = calc[i][11];
        results.push({
            time: 'End of Year ' + (i + 1),
            monthlyPayment: row.actualMonthlyPayment.toFixed(2),
            remaningPrincipal: row.loanPrincipal.toFixed(2),
            accruedInterest: row.accruingInterest.toFixed(2),
            totalDebt: row.loanPrincipal + row.accruingInterest.toFixed(2),
            totalPayments: row.totalPayments.toFixed(2)
        })
    }
    return results;
}

const payeMFSResults = getResults(calculations.payeMFSData);
const payeMFJResults = getResults(calculations.payeMFJData);
const repayeResults = getResults(calculations.repayeData);
const ibrMFSResults = getResults(calculations.ibrMFSData);
const ibrMFJResults = getResults(calculations.ibrMFJData);
const icrMFSResults = getResults(calculations.icrMFSData);
const icrMFJResults = getResults(calculations.icrMFJData);

module.exports = {
    payeMFSResults: payeMFSResults,
    payeMFJResults: payeMFJResults,
    repayeResults: repayeResults,
    ibrMFSResults: ibrMFSResults,
    ibrMFJResults: ibrMFJResults,
    icrMFSResults: icrMFSResults,
    icrMFJResults: icrMFJResults
}