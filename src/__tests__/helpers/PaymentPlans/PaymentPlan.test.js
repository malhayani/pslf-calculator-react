import PaymentPlan from '../../../helpers/PaymentPlans/PaymentPlan';

describe('Payment Plan Parent Class Test Suite', () => {
    
    // Contructor
    test('Payment plan constructor', () => {
        const currentInfo = {};
        const totalLoansInfo = {};
        const paymentPlan = new PaymentPlan(currentInfo, totalLoansInfo);
        expect(paymentPlan.currentInfo).toMatchObject(currentInfo);
        expect(paymentPlan.totalLoanInfo).toMatchObject(totalLoansInfo);
        expect(paymentPlan.paymentPlan).toMatchObject([]);
        expect(paymentPlan.povertyGuideline).toBe(12490);
        expect(paymentPlan.povertyPerPerson).toBe(4420);
        expect(paymentPlan.povertyInflationRate).toBe(0.02);
    });

    // Getter
    test ('Payment plan get current info', () => {
        const currentInfo = {};
        const totalLoansInfo = {};
        const paymentPlan = new PaymentPlan(currentInfo, totalLoansInfo);
        let spy = jest.spyOn(paymentPlan, 'currentInfo', 'get').mockReturnValue({});
        expect(paymentPlan.currentInfo).toMatchObject({});
        spy.mockRestore();
    });

    // Setter
    test ('Payment plan set current info', () => {
        const currentInfo = {};
        const totalLoansInfo = {};
        const paymentPlan = new PaymentPlan(currentInfo, totalLoansInfo);
        const mockObj = { attr: 1 };
        paymentPlan.currentInfo = mockObj;
        expect(paymentPlan.currentInfo).toMatchObject(mockObj);
    });

    // Getter
    test ('Payment plan get total loan info', () => {
        const currentInfo = {};
        const totalLoansInfo = {};
        const paymentPlan = new PaymentPlan(currentInfo, totalLoansInfo);
        let spy = jest.spyOn(paymentPlan, 'totalLoanInfo', 'get').mockReturnValue({});
        expect(paymentPlan.totalLoanInfo).toMatchObject({});
        spy.mockRestore();
    });

    // Setter
    test ('Payment plan set total loan info', () => {
        const currentInfo = {};
        const totalLoansInfo = {};
        const paymentPlan = new PaymentPlan(currentInfo, totalLoansInfo);
        const mockObj = { attr: 1 };
        paymentPlan.totalLoanInfo = mockObj;
        expect(paymentPlan.totalLoanInfo).toMatchObject(mockObj);
    });

    // Getter
    test ('Payment plan get payment plan', () => {
        const currentInfo = {};
        const totalLoansInfo = {};
        const paymentPlan = new PaymentPlan(currentInfo, totalLoansInfo);
        let spy = jest.spyOn(paymentPlan, 'paymentPlan', 'get').mockReturnValue([]);
        expect(paymentPlan.paymentPlan).toMatchObject([]);
        spy.mockRestore();
    });

    // Setter
    test ('Payment plan set payment plan', () => {
        const currentInfo = {};
        const totalLoansInfo = {};
        const paymentPlan = new PaymentPlan(currentInfo, totalLoansInfo);
        const mockObj = [10];
        paymentPlan.paymentPlan = mockObj;
        expect(paymentPlan.paymentPlan).toMatchObject(mockObj);
    });

    // Getter
    test ('Payment plan get poverty guideline', () => {
        const currentInfo = {};
        const totalLoansInfo = {};
        const paymentPlan = new PaymentPlan(currentInfo, totalLoansInfo);
        let spy = jest.spyOn(paymentPlan, 'povertyGuideline', 'get').mockReturnValue(10);
        expect(paymentPlan.povertyGuideline).toBe(10);
        spy.mockRestore();
    });

    // Setter
    test ('Payment plan set poverty guideline', () => {
        const currentInfo = {};
        const totalLoansInfo = {};
        const paymentPlan = new PaymentPlan(currentInfo, totalLoansInfo);
        paymentPlan.povertyGuideline = 10;
        expect(paymentPlan.povertyGuideline).toBe(10);
    });

    // Getter
    test ('Payment plan get poverty per person', () => {
        const currentInfo = {};
        const totalLoansInfo = {};
        const paymentPlan = new PaymentPlan(currentInfo, totalLoansInfo);
        let spy = jest.spyOn(paymentPlan, 'povertyPerPerson', 'get').mockReturnValue(10);
        expect(paymentPlan.povertyPerPerson).toBe(10);
        spy.mockRestore();
    });

    // Setter
    test ('Payment plan set poverty per person', () => {
        const currentInfo = {};
        const totalLoansInfo = {};
        const paymentPlan = new PaymentPlan(currentInfo, totalLoansInfo);
        paymentPlan.povertyPerPerson = 10;
        expect(paymentPlan.povertyPerPerson).toBe(10);
    });

    // Getter
    test ('Payment plan get poverty inflation rate', () => {
        const currentInfo = {};
        const totalLoansInfo = {};
        const paymentPlan = new PaymentPlan(currentInfo, totalLoansInfo);
        let spy = jest.spyOn(paymentPlan, 'povertyInflationRate', 'get').mockReturnValue(10);
        expect(paymentPlan.povertyInflationRate).toBe(10);
        spy.mockRestore();
    });

    // Setter
    test ('Payment plan set poverty inflation rate', () => {
        const currentInfo = {};
        const totalLoansInfo = {};
        const paymentPlan = new PaymentPlan(currentInfo, totalLoansInfo);
        paymentPlan.povertyInflationRate = 10;
        expect(paymentPlan.povertyInflationRate).toBe(10);
    });

    // Method
    test ('Payment function with values', () => {
        const currentInfo = {};
        const totalLoansInfo = {};
        const paymentPlan = new PaymentPlan(currentInfo, totalLoansInfo);
        expect(paymentPlan.paymentFunction(0.25, 10, 15000).toFixed(2)).toBe("1364.69");
    });

    // Method
    test ('Payment function without values', () => {
        const currentInfo = {};
        const totalLoansInfo = {};
        const paymentPlan = new PaymentPlan(currentInfo, totalLoansInfo);
        expect(paymentPlan.paymentFunction(0.00, 0, 0).toFixed(2)).toBe("0.00");
    });

});