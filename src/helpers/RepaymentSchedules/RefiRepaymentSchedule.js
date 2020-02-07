import RepaymentSchedule from './RepaymentSchedule';

class RefiRepaymentSchedule extends RepaymentSchedule {
    
    constructor (...args) {
        super(...args);
        this.capitalize = false;
        this.size = 20;
        this.accruing = true;
        this.interest = 0.04;
    }

    get capitalize () {
        return this._capitalize;
    }

    set capitalize (capitalize) {
        this._capitalize = capitalize;
    }

    get size () {
        return this._size;
    }

    set size (size) {
        this._size = size;
    }

    get accruing () {
        return this._accruing;
    }

    set accruing (accruing) {
        this._accruing = accruing;
    }

    get interest () {
        return this._interest;
    }

    set interest (interest) {
        this._interest = interest;
    }

    monthlyInterestCharge (previousMonth, first, interest) {
        if (first) return super.totalLoanInfo.loanBalance * (interest / 12);
        return previousMonth.loanPrincipal * (interest / 12);
    }
    
    actualMonthlyPayment = (payment, month, previousMonth, first) => {
        if (first) return payment;
        let val = month.monthlyInterestCharge !== 0 ? payment : 0;
        return Math.min(val, previousMonth.loanPrincipal);
    }

    loanPrincipal (month, previousMonth, first) {
        if (first) return super.totalLoanInfo.loanBalance + month.unpaidInterest;
        let val = previousMonth.loanPrincipal + month.unpaidInterest;
        return val > 0.01 ? val : 0;
    }

    calculateRepaymentSchedule () {
        let repaymentSchedule = super.initRepaymentSchedule(this._capitalize, this._size, this._accruing);
        let previousMonth = {};

        repaymentSchedule.forEach((year, yIndex) => {
            year.forEach((month, mIndex) => {
                const first = (yIndex === 0 && mIndex === 0);
                month.monthlyInterestCharge = this.monthlyInterestCharge(previousMonth, first, this._interest);
                month.actualMonthlyPayment = this.actualMonthlyPayment(super.payments[yIndex], month, previousMonth, first);
                month.unpaidInterest = super.unpaidInterest(month);
                month.loanPrincipal = this.loanPrincipal(month, previousMonth, first);
                month.totalPayments = super.totalPayments(month, previousMonth, first);
                previousMonth = month;
            });
        });
        return repaymentSchedule;
    }

}

export default RefiRepaymentSchedule;