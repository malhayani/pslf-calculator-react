import RepaymentSchedule from './RepaymentSchedule';

class ICRRepaymentSchedule extends RepaymentSchedule {
    
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
        if (first) {
            let val = super.totalLoanInfo.principal === currentMonth.loanPrincipal
                ? 0 - (super.totalLoanInfo.principal * 0.1) 
                : currentMonth.unpaidInterest;
            return Math.max(val, 0) + super.totalLoanInfo.accruedInterest;
        } else {
            let val = 0;
            if (previousMonth.accruingInterest + currentMonth.unpaidInterest > 0) {
                if (currentMonth.unpaidInterest > 0) {
                    val = currentMonth.unpaidInterest + previousMonth.accruingInterest;
                } else {
                    if (!(super.totalLoanInfo.principal === previousMonth.loanPrincipal)) {
                        val = currentMonth.unpaidInterest + previousMonth.accruingInterest;
                    } else val = val;
                }
            }
            return Math.max(0, val);
        }
    }

    loanPrincipal (currentMonth, previousMonth, first) {
        if (first) return super.totalLoanInfo.principal;
        else {
            let val = 0;
            if (currentMonth.unpaidInterest > 0) {
                val = previousMonth.loanPrincipal;
            } else if (super.totalLoanInfo.principal === previousMonth.loanPrincipal) {
                val = previousMonth.loanPrincipal + previousMonth.accruingInterest;
            } else if (previousMonth.accruingInterest === 0) {
                val = previousMonth.loanPrincipal + previousMonth.unpaidInterest;
            } else if (previousMonth.accruingInterest > 0) {
                val = previousMonth.loanPrincipal;
            } else val = val;
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

export default ICRRepaymentSchedule;