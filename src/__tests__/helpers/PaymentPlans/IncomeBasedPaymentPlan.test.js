import IncomeBasedPaymentPlan from '../../../helpers/PaymentPlans/IncomeBasedPaymentPlan';

describe('Refi Payment Plan Child Class Test Suite', () => {

    // Contructor
    test('Income based payment plan constructor', () => {
        const currentInfo = {};
        const totalLoansInfo = {};
        const mockIncomePlan = new Array(25).fill({agi: 0, spouseAgi: 0, familySize: 2});
        const mockStandardPayments = new Array(10).fill(0);
        const incomeBasedPaymentPlan = new IncomeBasedPaymentPlan(currentInfo, totalLoansInfo, 'jointly', 0.1, false, mockIncomePlan, mockStandardPayments);
        expect(incomeBasedPaymentPlan.currentInfo).toMatchObject(currentInfo);
        expect(incomeBasedPaymentPlan.totalLoanInfo).toMatchObject(totalLoansInfo);
        expect(incomeBasedPaymentPlan.paymentPlan).toMatchObject([]);
        expect(incomeBasedPaymentPlan.povertyGuideline).toBe(12490);
        expect(incomeBasedPaymentPlan.povertyPerPerson).toBe(4420);
        expect(incomeBasedPaymentPlan.povertyInflationRate).toBe(0.02);
        expect(incomeBasedPaymentPlan.filingStatus).toBe('jointly');
        expect(incomeBasedPaymentPlan.multiplier).toBe(0.1);
        expect(incomeBasedPaymentPlan.compareToStandard).toBe(false);
        expect(incomeBasedPaymentPlan.incomePlan).toMatchObject(mockIncomePlan);
        expect(incomeBasedPaymentPlan.standardPayments).toMatchObject(mockStandardPayments);
    });

    // Method
    test ('Income based payment plan calculate payments', () => {
        const currentInfo = {};
        const totalLoansInfo = {};
        const mockIncomePlan = new Array(25).fill({agi: 0, spouseAgi: 0, familySize: 2});
        const mockStandardPayments = new Array(10).fill(0);
        const incomeBasedPaymentPlan = new IncomeBasedPaymentPlan(currentInfo, totalLoansInfo, 'jointly', 0.1, false, mockIncomePlan, mockStandardPayments);
        const mockIncomeBasedPayments = new Array(25).fill(0);
        expect(incomeBasedPaymentPlan.calculatePayments()).toMatchObject(mockIncomeBasedPayments);
    });

    // Method
    test ('Income based payment plan calculate payments, payments less than standard payments', () => {
        const currentInfo = {};
        const totalLoansInfo = {};
        const mockIncomePlan = new Array(25).fill({agi: 100000, spouseAgi: 200000, familySize: 2});
        const mockStandardPayments = new Array(10).fill(1000);
        const incomeBasedPaymentPlan = new IncomeBasedPaymentPlan(currentInfo, totalLoansInfo, 'separately', 0.1, true, mockIncomePlan, mockStandardPayments);
        const mockIncomeBasedPayments = new Array(25).fill(621.9583333);
        expect(incomeBasedPaymentPlan.calculatePayments()).toMatchObject(mockIncomeBasedPayments);
    });

    // Method
    test ('Income based payment plan calculate payments, payments greater than standard payments', () => {
        const currentInfo = {};
        const totalLoansInfo = {};
        const mockIncomePlan = new Array(25).fill({agi: 100000, spouseAgi: 200000, familySize: 2});
        const mockStandardPayments = new Array(10).fill(200);
        const incomeBasedPaymentPlan = new IncomeBasedPaymentPlan(currentInfo, totalLoansInfo, 'separately', 0.1, true, mockIncomePlan, mockStandardPayments);
        const mockIncomeBasedPayments = new Array(25).fill(200);
        expect(incomeBasedPaymentPlan.calculatePayments()).toMatchObject(mockIncomeBasedPayments);
    });

});