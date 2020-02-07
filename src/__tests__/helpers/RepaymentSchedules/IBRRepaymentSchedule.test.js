import IBRRepaymentSchedule from '../../../helpers/RepaymentSchedules/IBRRepaymentSchedule';

describe('IBR repayment Schedule Parent Test Suite', () => {

     // Constructor Method
     test('IBR repayment schedule constructor', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        expect(IBRRepaymentScheduleMock.payments).toMatchObject(paymentsMock);
        expect(IBRRepaymentScheduleMock.totalLoanInfo).toMatchObject(totalLoanInfoMock);
        expect(IBRRepaymentScheduleMock.standardPayments).toMatchObject(standardPaymentsMock);
        expect(IBRRepaymentScheduleMock.repaymentSchedule).toMatchObject([]);
        expect(IBRRepaymentScheduleMock.capitalize).toBe(true);
        expect(IBRRepaymentScheduleMock.size).toBe(25);
        expect(IBRRepaymentScheduleMock.accruing).toBe(true);
    });

    // Getter
    test ('IBR repayment schedule get capitalize', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let spy = jest.spyOn(IBRRepaymentScheduleMock, 'capitalize', 'get').mockReturnValue(false);
        expect(IBRRepaymentScheduleMock.capitalize).toBe(false);
        spy.mockRestore();
    });

    // Setter
    test ('IBR repayment schedule set capitalize', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        IBRRepaymentScheduleMock.capitalize = true;
        expect(IBRRepaymentScheduleMock.capitalize).toBe(true);
    });

    // Getter
    test ('IBR repayment schedule get size', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let spy = jest.spyOn(IBRRepaymentScheduleMock, 'size', 'get').mockReturnValue(2);
        expect(IBRRepaymentScheduleMock.size).toBe(2);
        spy.mockRestore();
    });

    // Setter
    test ('IBR repayment schedule set size', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        IBRRepaymentScheduleMock.size = 5;
        expect(IBRRepaymentScheduleMock.size).toBe(5);
    });

    // Getter
    test ('IBR repayment schedule get accruing', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let spy = jest.spyOn(IBRRepaymentScheduleMock, 'accruing', 'get').mockReturnValue(false);
        expect(IBRRepaymentScheduleMock.accruing).toBe(false);
        spy.mockRestore();
    });

    // Setter
    test ('IBR repayment schedule set accruing', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        IBRRepaymentScheduleMock.accruing = true;
        expect(IBRRepaymentScheduleMock.accruing).toBe(true);
    });

    // Method
    test ('IBR repayment schedule actual monthly interest first month', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { monthlyInterestCharge: 1000 };
        let obj2 = { loanPrincipal: 1000 };
        expect(IBRRepaymentScheduleMock.actualMonthlyPayment(250, obj, obj2, true).toFixed(2)).toBe("250.00");
    });

    // Method
    test ('IBR repayment schedule actual monthly interest not first month', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { monthlyInterestCharge: 1000 };
        let obj2 = { loanPrincipal: 1000 };
        expect(IBRRepaymentScheduleMock.actualMonthlyPayment(250, obj, obj2, false).toFixed(2)).toBe("250.00");
    });

    // Method
    test ('IBR repayment schedule accuring interest first month', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 1000,
            accruedInterest: 1000,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { 
            accruingInterest: 11000,
            loanPrincipal:  1000
        };
        let obj2 = { 
            unpaidInterest: 1000,
            loanPrincipal: 1000
        };
        expect(IBRRepaymentScheduleMock.accruingInterest(obj2, obj, true).toFixed(2)).toBe("2000.00");
    });

    // Method
    test ('IBR repayment schedule accuring interest first month', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 1000,
            accruedInterest: 1000,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { 
            accruingInterest: 11000,
            loanPrincipal:  1000
        };
        let obj2 = { 
            unpaidInterest: 1000,
            loanPrincipal: 900
        };
        expect(IBRRepaymentScheduleMock.accruingInterest(obj2, obj, true).toFixed(2)).toBe("2000.00");
    });


    // Method
    test ('IBR repayment schedule accuring interest first month', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 1000,
            accruedInterest: 1000,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { 
            accruingInterest: 11000,
            loanPrincipal:  1000
        };
        let obj2 = { 
            unpaidInterest: 0,
            loanPrincipal: 900
        };
        expect(IBRRepaymentScheduleMock.accruingInterest(obj2, obj, true).toFixed(2)).toBe("1000.00");
    });

    // Method
    test ('IBR repayment schedule accuring interest not first month', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 1000,
            accruedInterest: 1000,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { 
            accruingInterest: 11000,
            loanPrincipal:  1000
        };
        let obj2 = { 
            unpaidInterest: 1000,
            loanPrincipal: 1000
        };
        expect(IBRRepaymentScheduleMock.accruingInterest(obj2, obj, false).toFixed(2)).toBe("12000.00");
    });

    // Method
    test ('IBR repayment schedule accuring interest not first month', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 1000,
            accruedInterest: 1000,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { 
            accruingInterest: 11000,
            loanPrincipal:  900
        };
        let obj2 = { 
            unpaidInterest: 0,
            loanPrincipal: 1000
        };
        expect(IBRRepaymentScheduleMock.accruingInterest(obj2, obj, false).toFixed(2)).toBe("11000.00");
    });

    // Method
    test ('IBR repayment schedule accuring interest not first month', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 1000,
            accruedInterest: 1000,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { 
            accruingInterest: 11000,
            loanPrincipal:  900
        };
        let obj2 = { 
            unpaidInterest: 100,
            loanPrincipal: 900
        };
        expect(IBRRepaymentScheduleMock.accruingInterest(obj2, obj, false).toFixed(2)).toBe("11100.00");
    });

    // Method
    test ('IBR repayment schedule loan principal first month', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 1000,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { loanPrincipal: 11000 };
        let obj2 = {
            unpaidInterest: 1000,
            accruingInterest: 1000,
            capitalizeInterest: false 
        };
        expect(IBRRepaymentScheduleMock.loanPrincipal(obj2, obj, true).toFixed(2)).toBe("1000.00");
    });

    // Method
    test ('IBR repayment schedule loan principal not first month', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 1000,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { 
            loanPrincipal: 11000,
            accruingInterest: 100,
            hasInterestCapitlized: false
        };
        let obj2 = {
            unpaidInterest: 1000,
            accruingInterest: 1000,
            capitalizeInterest: false 
        };
        expect(IBRRepaymentScheduleMock.loanPrincipal(obj2, obj, false).toFixed(2)).toBe("11000.00");
    });

    // Method
    test ('IBR repayment schedule loan principal not first month', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 1000,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { 
            loanPrincipal: 1000,
            accruingInterest: 0,
            hasInterestCapitlized: false
        };
        let obj2 = {
            unpaidInterest: 0,
            accruingInterest: 0,
            capitalizeInterest: false 
        };
        expect(IBRRepaymentScheduleMock.loanPrincipal(obj2, obj, false).toFixed(2)).toBe("1000.00");
    });

    // Method
    test ('IBR repayment schedule loan principal not first month', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 1000,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { 
            loanPrincipal: 100,
            accruingInterest: 10,
            hasInterestCapitlized: false
        };
        let obj2 = {
            unpaidInterest: 0,
            accruingInterest: 0,
            capitalizeInterest: false
        };
        expect(IBRRepaymentScheduleMock.loanPrincipal(obj2, obj, false).toFixed(2)).toBe("100.00");
    });

    // Method
    test ('IBR repayment schedule loan principal not first month', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 1000,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { 
            loanPrincipal: 100,
            accruingInterest: 10,
            hasInterestCapitlized: true
        };
        let obj2 = {
            unpaidInterest: 0,
            accruingInterest: 10,
            capitalizeInterest: true
        };
        expect(IBRRepaymentScheduleMock.loanPrincipal(obj2, obj, false).toFixed(2)).toBe("110.00");
    });

    test ('IBR repayment calculate repayment schedule function call', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);

        let spy = jest.spyOn(IBRRepaymentScheduleMock, 'calculateRepaymentSchedule').mockReturnValue([]);
        expect(IBRRepaymentScheduleMock.calculateRepaymentSchedule()).toMatchObject([]);
        spy.mockRestore();
    });

    test ('IBR repayment calculate repayment schedule function call', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
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
        expect(IBRRepaymentScheduleMock.calculateRepaymentSchedule()).toMatchObject(mockRepaymentSchedule);
    });

});