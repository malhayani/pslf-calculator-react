import StandardRepaymentSchedule from '../../../helpers/RepaymentSchedules/StandardRepaymentSchedule';

describe('Standard Repayment Schedule Parent Test Suite', () => {

     // Constructor Method
     test('Standard repayment schedule constructor', () => {
        let paymentsMock = new Array(10).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const standardRepaymentScheduleMock = new StandardRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        expect(standardRepaymentScheduleMock.payments).toMatchObject(paymentsMock);
        expect(standardRepaymentScheduleMock.totalLoanInfo).toMatchObject(totalLoanInfoMock);
        expect(standardRepaymentScheduleMock.standardPayments).toMatchObject(standardPaymentsMock);
        expect(standardRepaymentScheduleMock.repaymentSchedule).toMatchObject([]);
        expect(standardRepaymentScheduleMock.capitalize).toBe(false);
        expect(standardRepaymentScheduleMock.size).toBe(10);
        expect(standardRepaymentScheduleMock.accruing).toBe(false);
    });

    // Getter
    test ('Standard repayment schedule get capitalize', () => {
        let paymentsMock = new Array(10).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const standardRepaymentScheduleMock = new StandardRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let spy = jest.spyOn(standardRepaymentScheduleMock, 'capitalize', 'get').mockReturnValue(false);
        expect(standardRepaymentScheduleMock.capitalize).toBe(false);
        spy.mockRestore();
    });

    // Setter
    test ('Standard repayment schedule set capitalize', () => {
        let paymentsMock = new Array(10).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const standardRepaymentScheduleMock = new StandardRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        standardRepaymentScheduleMock.capitalize = true;
        expect(standardRepaymentScheduleMock.capitalize).toBe(true);
    });

    // Getter
    test ('Standard repayment schedule get size', () => {
        let paymentsMock = new Array(10).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const standardRepaymentScheduleMock = new StandardRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let spy = jest.spyOn(standardRepaymentScheduleMock, 'size', 'get').mockReturnValue(2);
        expect(standardRepaymentScheduleMock.size).toBe(2);
        spy.mockRestore();
    });

    // Setter
    test ('Standard repayment schedule set size', () => {
        let paymentsMock = new Array(10).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const standardRepaymentScheduleMock = new StandardRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        standardRepaymentScheduleMock.size = 5;
        expect(standardRepaymentScheduleMock.size).toBe(5);
    });

    // Getter
    test ('Standard repayment schedule get accruing', () => {
        let paymentsMock = new Array(10).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const standardRepaymentScheduleMock = new StandardRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let spy = jest.spyOn(standardRepaymentScheduleMock, 'accruing', 'get').mockReturnValue(false);
        expect(standardRepaymentScheduleMock.accruing).toBe(false);
        spy.mockRestore();
    });

    // Setter
    test ('Standard repayment schedule set accruing', () => {
        let paymentsMock = new Array(10).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const standardRepaymentScheduleMock = new StandardRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        standardRepaymentScheduleMock.accruing = true;
        expect(standardRepaymentScheduleMock.accruing).toBe(true);
    });

    // Method
    test ('Standard repayment schedule monthly interest charge first month', () => {
        let paymentsMock = new Array(10).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const standardRepaymentScheduleMock = new StandardRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { loanPrincipal: 11000 };
        expect(standardRepaymentScheduleMock.monthlyInterestCharge(obj, true, 0.25).toFixed(2)).toBe("208.33");
    });

    // Method
    test ('Standard repayment schedule monthly interest charge not first month', () => {
        let paymentsMock = new Array(10).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const standardRepaymentScheduleMock = new StandardRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { loanPrincipal: 11000 };
        expect(standardRepaymentScheduleMock.monthlyInterestCharge(obj, false, 0.25).toFixed(2)).toBe("229.17");
    });

    // Method
    test ('Standard repayment schedule loan principal first month', () => {
        let paymentsMock = new Array(10).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const standardRepaymentScheduleMock = new StandardRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { loanPrincipal: 11000 };
        let obj2 = { unpaidInterest: 1000 };
        expect(standardRepaymentScheduleMock.loanPrincipal(obj2, obj, true).toFixed(2)).toBe("11000.00");
    });

    // Method
    test ('Standard repayment schedule loan principal not first month', () => {
        let paymentsMock = new Array(10).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const standardRepaymentScheduleMock = new StandardRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { loanPrincipal: 11000 };
        let obj2 = { unpaidInterest: 1000 };
        expect(standardRepaymentScheduleMock.loanPrincipal(obj2, obj, false).toFixed(2)).toBe("12000.00");
    });

    test ('Standard repayment calculate repayment schedule function call', () => {
        let paymentsMock = new Array(10).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const standardRepaymentScheduleMock = new StandardRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);

        let spy = jest.spyOn(standardRepaymentScheduleMock, 'calculateRepaymentSchedule').mockReturnValue([]);
        expect(standardRepaymentScheduleMock.calculateRepaymentSchedule()).toMatchObject([]);
        spy.mockRestore();
    });

    test ('Standard repayment calculate repayment schedule function call', () => {
        let paymentsMock = new Array(10).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const standardRepaymentScheduleMock = new StandardRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        const mockRepaymentSchedule = new Array(10);
        for (let c = 0; c < mockRepaymentSchedule.length; c++) {
            mockRepaymentSchedule[c] = [];
            for (let i = 0; i < 12; i++) {
                let obj = {
                    payment: (c * 12) + (i + 1),
                    monthlyInterestCharge: 0,
                    actualMonthlyPayment: 0,
                    unpaidInterest: 0,
                    loanPrincipal: 0,
                    totalPayments: 0
                }
                mockRepaymentSchedule[c].push(obj)
            }
        }
        expect(standardRepaymentScheduleMock.calculateRepaymentSchedule()).toMatchObject(mockRepaymentSchedule);
    });

});