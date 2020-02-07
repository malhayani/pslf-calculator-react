import RepaymentSchedule from './RepaymentSchedule';

class PayeRepaymentSchedule extends RepaymentSchedule {

    constructor (...args) {
        super(...args);
        this.capitalize = true;
        this.size = 20;
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

    actualMonthlyPayment (payment, currentMonth, previousMonth, first) {
        let actualMonthlyPayment = currentMonth.monthlyInterestCharge === 0 ? 0 : payment;
        if (first) return actualMonthlyPayment;
        else return Math.min(actualMonthlyPayment, previousMonth.loanPrincipal);
    } 

    accruingInterest (currentMonth, previousMonth, first) {
        if (first) return (Math.max(0, currentMonth.unpaidInterest) + super.totalLoanInfo.accruedInterest);
        else {
            const condition = currentMonth.capitalizeInterest && !previousMonth.hasInterestCapitlized;
            let val = (condition) 
                ? currentMonth.unpaidInterest + previousMonth.accruingInterest - (0.1 * super.totalLoanInfo.principal)
                : currentMonth.unpaidInterest + previousMonth.accruingInterest;
            return Math.max(0, val);
        }
    }

    loanPrincipal (currentMonth, previousMonth, first) {
        if (first) return super.totalLoanInfo.principal;
        else {
            let val = 0;
            const condition = currentMonth.capitalizeInterest && !previousMonth.hasInterestCapitlized;
            val = condition 
                ? previousMonth.loanPrincipal + (0.1 * super.totalLoanInfo.principal) 
                : previousMonth.loanPrincipal;     
            val = currentMonth.accruingInterest === 0 
                ? val + currentMonth.unpaidInterest 
                : val;
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
                month.actualMonthlyPayment = this.actualMonthlyPayment(super.payments[yIndex], month, previousMonth, first);
                month.capitalizeInterest = super.capitalizeInterest(month, first);
                month.unpaidInterest = super.unpaidInterest(month);
                month.accruingInterest = this.accruingInterest(month, previousMonth, first);
                month.loanPrincipal = this.loanPrincipal(month, previousMonth, first);
                month.hasInterestCapitlized = super.hasInterestCapitlized(month, first);
                month.totalPayments = super.totalPayments(month, previousMonth, first);
                previousMonth = month;
            });
        });
        return repaymentSchedule;
    }

}

export default PayeRepaymentSchedule;