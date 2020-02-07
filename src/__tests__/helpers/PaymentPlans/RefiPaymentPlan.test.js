import RefiPaymentPlan from '../../../helpers/PaymentPlans/RefiPaymentPlan';

describe('Refi Payment Plan Child Class Test Suite', () => {

    // Contructor
    test('Refi payment plan constructor', () => {
        const currentInfo = {};
        const totalLoansInfo = {};
        const refiPaymentPlan = new RefiPaymentPlan(currentInfo, totalLoansInfo);
        expect(refiPaymentPlan.currentInfo).toMatchObject(currentInfo);
        expect(refiPaymentPlan.totalLoanInfo).toMatchObject(totalLoansInfo);
        expect(refiPaymentPlan.paymentPlan).toMatchObject([]);
        expect(refiPaymentPlan.povertyGuideline).toBe(12490);
        expect(refiPaymentPlan.povertyPerPerson).toBe(4420);
        expect(refiPaymentPlan.povertyInflationRate).toBe(0.02);
        expect(refiPaymentPlan.term).toBe(10);
        expect(refiPaymentPlan.interest).toBe(0.04);
    });

    // Method
    test ('Refi payment plan calculate payments', () => {
        const currentInfo = {};
        const totalLoansInfo = {};
        const refiPaymentPlan = new RefiPaymentPlan(currentInfo, totalLoansInfo);

        const mockRefiPayments = new Array(20).fill(0);
        expect(refiPaymentPlan.calculatePayments()).toMatchObject(mockRefiPayments);
    });

});