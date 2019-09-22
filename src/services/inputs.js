const yearPlan = [
    {
        familySize: 2,
        agi: 68600,
        spouseAgi: 200150
    },{
        familySize: 2,
        agi: 71000,
        spouseAgi: 206155
    },{
        familySize: 2,
        agi: 73130,
        spouseAgi: 212339
    },{
        familySize: 2,
        agi: 75324,
        spouseAgi: 218709
    },{
        familySize: 2,
        agi: 77584,
        spouseAgi: 225271
    },{
        familySize: 2,
        agi: 79911,
        spouseAgi: 232029
    },{
        familySize: 2,
        agi: 82308,
        spouseAgi: 238990
    },{
        familySize: 2,
        agi: 84778,
        spouseAgi: 246159
    },{
        familySize: 2,
        agi: 87321,
        spouseAgi: 253544
    },{
        familySize: 2,
        agi: 89941,
        spouseAgi: 261150
    },{
        familySize: 2,
        agi: 92639,
        spouseAgi: 268985
    },{
        familySize: 2,
        agi: 95418,
        spouseAgi: 277054
    },{
        familySize: 2,
        agi: 98281,
        spouseAgi: 285366
    },{
        familySize: 2,
        agi: 101229,
        spouseAgi: 293927
    },{
        familySize: 2,
        agi: 104266,
        spouseAgi: 302745
    },{
        familySize: 2,
        agi: 107394,
        spouseAgi: 311827
    },{
        familySize: 2,
        agi: 110616,
        spouseAgi: 321182
    },{
        familySize: 2,
        agi: 113934,
        spouseAgi: 330817
    },{
        familySize: 2,
        agi: 117352,
        spouseAgi: 340742
    },{
        familySize: 2,
        agi: 120873,
        spouseAgi: 350964
    },{
        familySize: 2,
        agi: 124499,
        spouseAgi: 361493
    },{
        familySize: 2,
        agi: 128234,
        spouseAgi: 372338
    },{
        familySize: 2,
        agi: 132081,
        spouseAgi: 383508
    },{
        familySize: 2,
        agi: 136043,
        spouseAgi: 395013
    },{
        familySize: 2,
        agi: 140125,
        spouseAgi: 406864
    },{
        familySize: 2,
        agi: 144328,
        spouseAgi: 419070
    }
]

const currentInfo = {
    isMarried: true,
    additionalFamilyMembers: 0,
    lastYearAgi: 68600,
    thisYearAgi: 71000,
    nextYearAgi: 73130,
    spouseAgi: 200150,
    spouseLoans: 0,
    spouseLoanInterestRate: 0.00
}

const loanInfo = [
    {
        type: 'unsubsidized',
        principal: 100000,
        accruedInterest: 15000,
        interest: 0.05
    },
    {
        type: 'subsidized',
        principal: 50000,
        accruedInterest: 10000,
        interest: 0.0625
    }
]

/* Calculates Total Loan Balance for each loan */
loanInfo.forEach(l => {
    l.totalLoanBalance = l.principal + l.accruedInterest
})

/* Sum all the values of the specified attribute in an array of objects */
const totalValue = (obj, attr) => {
    let arr = obj.map(x => x[attr]);
    return arr.reduce((a, b) => a + b, 0);
}

/* Returns average interest rate for all loans */
const averageInterestRate = (loans) => {
    let arr = loans.map(loan => loan.principal * loan.interest);
    let val = arr.reduce((a, b) => a + b, 0);
    return val / totalValue(loanInfo, 'principal');
}

/* Object of calculated total values */
const totalLoanInfo = {
    principal: totalValue(loanInfo, 'principal'),
    accruedInterest: totalValue(loanInfo, 'accruedInterest'),
    loanBalance: totalValue(loanInfo, 'totalLoanBalance'),
    interest: averageInterestRate(loanInfo)
}

const povertyInfo = {
    guideline: 12490,
    perPerson: 4420,
    inflationRate: 0.02
}

const taxInfo = { 
    agiInflation: 0.03,
    taxInflation: 0.03
}

const refiInfo = {
    term: 10,
    interest: 0.04
}

module.exports = {
    yearPlan: yearPlan,
    currentInfo: currentInfo,
    loanInfo: loanInfo,
    totalLoanInfo: totalLoanInfo,
    povertyInfo: povertyInfo,
    taxInfo: taxInfo,
    refiInfo: refiInfo
}