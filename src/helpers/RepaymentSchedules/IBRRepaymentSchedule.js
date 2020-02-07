import RepaymentSchedule from './RepaymentSchedule';

class IBRRepaymentSchedule extends RepaymentSchedule {

    constructor (...args) {
        super(...args);
        this.capitalize = true;
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

    actualMonthlyPayment (payment, currentMonth, previousMonth, first) {
        let actualMonthlyPayment = currentMonth.monthlyInterestCharge === 0 ? 0 : payment;
        if (first) return actualMonthlyPayment;
        else return Math.min(actualMonthlyPayment, previousMonth.loanPrincipal);
    } 

    accruingInterest (currentMonth, previousMonth, first) {
        if (first) {
            let val = 0;
            if (currentMonth.unpaidInterest > 0) val = currentMonth.unpaidInterest;
            else {
                val = super.totalLoanInfo.principal === currentMonth.loanPrincipal
                    ? val - (super.totalLoanInfo.principal * 0.01)
                    : currentMonth.unpaidInterest;
            }
            return (val > 0.01 ? val : 0) + super.totalLoanInfo.accruedInterest;
        } else {
            let val = currentMonth.capitalizeInterest && !previousMonth.hasInterestCapitlized
                ? 0
                : currentMonth.unpaidInterest + previousMonth.accruingInterest;
            return val > 0.01 ? val : 0;
        }
    }

    loanPrincipal (currentMonth, previousMonth, first) {
        if (first) return super.totalLoanInfo.principal;
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

export default IBRRepaymentSchedule;