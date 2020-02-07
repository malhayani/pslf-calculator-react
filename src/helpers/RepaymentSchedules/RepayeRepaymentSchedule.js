import RepaymentSchedule from './RepaymentSchedule';

class RepayeRepaymentSchedule extends RepaymentSchedule {

    constructor (...args) {
        super(...args);
        this.capitalize = false;
        this.size = 25;
        this.accruing = true;
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

    actualMonthlyPayment (payment, currentMonth) {
        return currentMonth.monthlyInterestCharge === 0 ? 0 : payment;
    } 

    accruingInterest (currentMonth, previousMonth, first) {
        if (first) return super.totalLoanInfo.accruedInterest;
        let val = currentMonth.unpaidInterest > 0
            ? (currentMonth.unpaidInterest * 0.5) + previousMonth.accruingInterest
            : currentMonth.unpaidInterest + previousMonth.accruingInterest;
        return Math.max(0, val);
    }

    loanPrincipal (currentMonth, previousMonth, first) {
        if (first) return super.totalLoanInfo.principal;
        else {
            let val = currentMonth.accruingInterest === 0
                ? previousMonth.loanPrincipal + currentMonth.unpaidInterest
                : previousMonth.loanPrincipal
            return val > 0.01 ? val : 0;
        }
    }

    calculateRepaymentSchedule () {
        let repaymentSchedule = super.initRepaymentSchedule(this._capitalize, this._size, this._accruing);
        let previousMonth = {};

        repaymentSchedule.forEach((year, yIndex) => {
            year.forEach((month, mIndex) => {
                const first = (yIndex === 0 && mIndex === 0);
                month.monthlyInterestCharge = super.monthlyInterestCharge(previousMonth, first);
                month.actualMonthlyPayment = this.actualMonthlyPayment(super.payments[yIndex], month);
                month.unpaidInterest = super.unpaidInterest(month);
                month.accruingInterest = this.accruingInterest(month, previousMonth, first);
                month.loanPrincipal = this.loanPrincipal(month, previousMonth, first);
                month.totalPayments = super.totalPayments(month, previousMonth, first);
                previousMonth = month;
            });
        });
        return repaymentSchedule;
    }

}

export default RepayeRepaymentSchedule;