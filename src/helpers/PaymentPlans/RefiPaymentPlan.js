import PaymentPlan from './PaymentPlan';

class RefiPaymentPlan extends PaymentPlan {
    
    constructor (...args) {
        super(...args);
        this.term = 10;
        this.interest = 0.04;
    }

    // Creates a 10 item payment list for refi payment plans
    calculatePayments () {
        let refiPayments = new Array(20);
        let refiPayment = super.paymentFunction(this._interest, -(this._term * 12), (0 - super.totalLoanInfo.loanBalance));
        refiPayments = refiPayments.fill(refiPayment, 0, 20);
        return refiPayments;
    }

}

export default RefiPaymentPlan;