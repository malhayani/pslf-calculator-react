import StandardPaymentPlan from '../../../helpers/PaymentPlans/StandardPaymentPlan';

describe('Standard Payment Plan Child Class Test Suite', () => {

    // Method
    test ('Standard payment plan calculate payments', () => {
        const currentInfo = {};
        const totalLoansInfo = {};
        const standardPaymentPlan = new StandardPaymentPlan(currentInfo, totalLoansInfo);

        const mockStandardPayments = new Array(10).fill(0);
        expect(standardPaymentPlan.calculatePayments()).toMatchObject(mockStandardPayments);
    });

});