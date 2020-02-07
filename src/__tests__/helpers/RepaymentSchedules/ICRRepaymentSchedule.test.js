import ICRRepaymentSchedule from '../../../helpers/RepaymentSchedules/ICRRepaymentSchedule';

describe('ICR repayment Schedule Parent Test Suite', () => {

     // Constructor Method
     test('ICR repayment schedule constructor', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        expect(ICRRepaymentScheduleMock.payments).toMatchObject(paymentsMock);
        expect(ICRRepaymentScheduleMock.totalLoanInfo).toMatchObject(totalLoanInfoMock);
        expect(ICRRepaymentScheduleMock.standardPayments).toMatchObject(standardPaymentsMock);
        expect(ICRRepaymentScheduleMock.repaymentSchedule).toMatchObject([]);
        expect(ICRRepaymentScheduleMock.capitalize).toBe(false);
        expect(ICRRepaymentScheduleMock.size).toBe(25);
        expect(ICRRepaymentScheduleMock.accruing).toBe(true);
    });

    // Getter
    test ('ICR repayment schedule get capitalize', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let spy = jest.spyOn(ICRRepaymentScheduleMock, 'capitalize', 'get').mockReturnValue(false);
        expect(ICRRepaymentScheduleMock.capitalize).toBe(false);
        spy.mockRestore();
    });

    // Setter
    test ('ICR repayment schedule set capitalize', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        ICRRepaymentScheduleMock.capitalize = true;
        expect(ICRRepaymentScheduleMock.capitalize).toBe(true);
    });

    // Getter
    test ('ICR repayment schedule get size', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let spy = jest.spyOn(ICRRepaymentScheduleMock, 'size', 'get').mockReturnValue(2);
        expect(ICRRepaymentScheduleMock.size).toBe(2);
        spy.mockRestore();
    });

    // Setter
    test ('ICR repayment schedule set size', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        ICRRepaymentScheduleMock.size = 5;
        expect(ICRRepaymentScheduleMock.size).toBe(5);
    });

    // Getter
    test ('ICR repayment schedule get accruing', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let spy = jest.spyOn(ICRRepaymentScheduleMock, 'accruing', 'get').mockReturnValue(false);
        expect(ICRRepaymentScheduleMock.accruing).toBe(false);
        spy.mockRestore();
    });

    // Setter
    test ('ICR repayment schedule set accruing', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        ICRRepaymentScheduleMock.accruing = true;
        expect(ICRRepaymentScheduleMock.accruing).toBe(true);
    });

    // Method
    test ('ICR repayment schedule actual monthly interest first month', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { monthlyInterestCharge: 1000 };
        expect(ICRRepaymentScheduleMock.actualMonthlyPayment(250, obj).toFixed(2)).toBe("250.00");
    });

    // Method
    test ('ICR repayment schedule accuring interest first month', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 1000,
            accruedInterest: 1000,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { 
            accruingInterest: 11000,
            loanPrincipal:  1000
        };
        let obj2 = { 
            unpaidInterest: 1000,
            loanPrincipal: 1000
        };
        expect(ICRRepaymentScheduleMock.accruingInterest(obj2, obj, true).toFixed(2)).toBe("1000.00");
    });

    // Method
    test ('ICR repayment schedule accuring interest first month', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 1000,
            accruedInterest: 1000,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { 
            accruingInterest: 11000,
            loanPrincipal:  1000
        };
        let obj2 = { 
            unpaidInterest: 1000,
            loanPrincipal: 900
        };
        expect(ICRRepaymentScheduleMock.accruingInterest(obj2, obj, true).toFixed(2)).toBe("2000.00");
    });

    // Method
    test ('ICR repayment schedule accuring interest not first month', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 1000,
            accruedInterest: 1000,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { 
            accruingInterest: 11000,
            loanPrincipal:  1000
        };
        let obj2 = { 
            unpaidInterest: 1000,
            loanPrincipal: 1000
        };
        expect(ICRRepaymentScheduleMock.accruingInterest(obj2, obj, false).toFixed(2)).toBe("12000.00");
    });

    // Method
    test ('ICR repayment schedule accuring interest not first month', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 1000,
            accruedInterest: 1000,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { 
            accruingInterest: 11000,
            loanPrincipal:  900
        };
        let obj2 = { 
            unpaidInterest: 0,
            loanPrincipal: 1000
        };
        expect(ICRRepaymentScheduleMock.accruingInterest(obj2, obj, false).toFixed(2)).toBe("11000.00");
    });

    // Method
    test ('ICR repayment schedule accuring interest not first month', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 1000,
            accruedInterest: 1000,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { 
            accruingInterest: 11000,
            loanPrincipal:  1000
        };
        let obj2 = { 
            unpaidInterest: 0,
            loanPrincipal: 1000
        };
        expect(ICRRepaymentScheduleMock.accruingInterest(obj2, obj, false).toFixed(2)).toBe("0.00");
    });

    // Method
    test ('ICR repayment schedule loan principal first month', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 1000,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { loanPrincipal: 11000 };
        let obj2 = {
            unpaidInterest: 1000,
            accruingInterest: 1000 
        };
        expect(ICRRepaymentScheduleMock.loanPrincipal(obj2, obj, true).toFixed(2)).toBe("1000.00");
    });

    // Method
    test ('ICR repayment schedule loan principal not first month', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 1000,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { 
            loanPrincipal: 11000,
            accruingInterest: 100
        };
        let obj2 = {
            unpaidInterest: 1000,
            accruingInterest: 1000 
        };
        expect(ICRRepaymentScheduleMock.loanPrincipal(obj2, obj, false).toFixed(2)).toBe("11000.00");
    });

    // Method
    test ('ICR repayment schedule loan principal not first month', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 1000,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { 
            loanPrincipal: 1000,
            accruingInterest: 0
        };
        let obj2 = {
            unpaidInterest: 0,
            accruingInterest: 0 
        };
        expect(ICRRepaymentScheduleMock.loanPrincipal(obj2, obj, false).toFixed(2)).toBe("1000.00");
    });

    // Method
    test ('ICR repayment schedule loan principal not first month', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 1000,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { 
            loanPrincipal: 100,
            accruingInterest: 0
        };
        let obj2 = {
            unpaidInterest: 0,
            accruingInterest: 0 
        };
        expect(ICRRepaymentScheduleMock.loanPrincipal(obj2, obj, false).toFixed(2)).toBe("0.00");
    });

    // Method
    test ('ICR repayment schedule loan principal not first month', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 1000,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { 
            loanPrincipal: 100,
            accruingInterest: 10
        };
        let obj2 = {
            unpaidInterest: 0,
            accruingInterest: 0 
        };
        expect(ICRRepaymentScheduleMock.loanPrincipal(obj2, obj, false).toFixed(2)).toBe("100.00");
    });

    // Method
    test ('ICR repayment schedule loan principal not first month', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 1000,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { 
            loanPrincipal: 100,
            accruingInterest: -10
        };
        let obj2 = {
            unpaidInterest: 0,
            accruingInterest: 0 
        };
        expect(ICRRepaymentScheduleMock.loanPrincipal(obj2, obj, false).toFixed(2)).toBe("0.00");
    });

    test ('ICR repayment calculate repayment schedule function call', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);

        let spy = jest.spyOn(ICRRepaymentScheduleMock, 'calculateRepaymentSchedule').mockReturnValue([]);
        expect(ICRRepaymentScheduleMock.calculateRepaymentSchedule()).toMatchObject([]);
        spy.mockRestore();
    });

    test ('ICR repayment calculate repayment schedule function call', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        const mockRepaymentSchedule = new Array(25);
        for (let c = 0; c < mockRepaymentSchedule.length; c++) {
            mockRepaymentSchedule[c] = [];
            for (let i = 0; i < 12; i++) {
                let obj = {
                    payment: (c * 12) + (i + 1),
                    monthlyInterestCharge: 0,
                    actualMonthlyPayment: 0,
                    unpaidInterest: 0,
                    loanPrincipal: 0,
                    totalPayments: 0,
                    accruingInterest: 0
                }
                mockRepaymentSchedule[c].push(obj)
            }
        }
        expect(ICRRepaymentScheduleMock.calculateRepaymentSchedule()).toMatchObject(mockRepaymentSchedule);
    });

});