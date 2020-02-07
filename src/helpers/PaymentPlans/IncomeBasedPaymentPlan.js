import PaymentPlan from './PaymentPlan';

class IncomeBasedPaymentPlan extends PaymentPlan {

    constructor (currentInfo, totalLoanInfo, filingStatus, multiplier, compareToStandard, incomePlan, standardPayments) {
        super(currentInfo, totalLoanInfo);
        this.filingStatus = filingStatus;
        this.multiplier = multiplier;
        this.compareToStandard = compareToStandard;
        this.incomePlan = incomePlan;
        this.standardPayments = standardPayments;
    }

    // Creates a 25 item payment plan for paye/repaye/ibr/icr payment plans
    calculatePayments () {
        let paymentPlan = this.incomePlan.map(year => {
            const incomeCalc = this.filingStatus === 'jointly' 
                ? year.agi + year.spouseAgi 
                : year.agi;
            const povertyCalc = super.povertyGuideline + (year.familySize - 1) * super.povertyPerPerson;
            const principalCalc = this.filingStatus === 'jointly' 
                ? super.totalLoanInfo.principal / (super.totalLoanInfo.principal + super.currentInfo.spouseLoans) 
                : 1;
            let payment = this.multiplier * (incomeCalc - 1.5 * (povertyCalc)) / 12 * principalCalc;
            payment = payment > 0 ? payment : 0;
            if (this.compareToStandard) payment = payment > this.standardPayments[0] ? this.standardPayments[0] : payment;
            return parseFloat(payment.toFixed(7));
        });
        return paymentPlan;
    }

}

export default IncomeBasedPaymentPlan;