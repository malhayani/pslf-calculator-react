class RepaymentSchedule {

    constructor (payments, totalLoanInfo, standardPayments) {
        this.payments = payments;
        this.totalLoanInfo = totalLoanInfo;
        this.standardPayments = standardPayments;
        this.repaymentSchedule = [];
    }

    get payments () {
        return this._payments;
    }

    set payments (payments) {
        this._payments = payments;
    }

    get totalLoanInfo () {
        return this._totalLoanInfo;
    }

    set totalLoanInfo (totalLoanInfo) {
        this._totalLoanInfo = totalLoanInfo;
    }

    get standardPayments () {
        return this._standardPayments;
    }

    set standardPayments (standardPayments) {
        this._standardPayments = standardPayments;
    }

    get repaymentSchedule () {
        return this._repaymentSchedule;
    }

    set repaymentSchedule (repaymentSchedule) {
        this._repaymentSchedule = repaymentSchedule;
    }

    /* Loan Calculation Functions */ 
    monthlyInterestCharge (previousMonth, first) {
        if (first) return this._totalLoanInfo.principal * this._totalLoanInfo.interest / 12;
        else {
            let payment = previousMonth.loanPrincipal * this._totalLoanInfo.interest / 12;
            return Math.max(payment, 0);
        }
    }

    capitalizeInterest (currentMonth, first) {
        if (first) return false
        else return (currentMonth.actualMonthlyPayment >= this._standardPayments[0]);
    }

    unpaidInterest (currentMonth) {
        return currentMonth.monthlyInterestCharge - currentMonth.actualMonthlyPayment;
    }

    hasInterestCapitlized (currentMonth, first) {
        if (first) return (currentMonth.loanPrincipal - this._totalLoanInfo.principal !== 0);
        else return (currentMonth.loanPrincipal !== this._totalLoanInfo.principal);
    }

    totalPayments (currentMonth, previousMonth, first) {
        if (first) return currentMonth.actualMonthlyPayment;
        else return currentMonth.actualMonthlyPayment + previousMonth.totalPayments;
    }
    
    // Creates initial data structure for repayment schedule
    initRepaymentSchedule (capitalize, length, accruing) {
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

}

export default RepaymentSchedule;