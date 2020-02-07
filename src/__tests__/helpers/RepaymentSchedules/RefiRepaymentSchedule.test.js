import RefiRepaymentSchedule from '../../../helpers/RepaymentSchedules/RefiRepaymentSchedule';

describe('Refi repayment Schedule Parent Test Suite', () => {

     // Constructor Method
     test('Refi repayment schedule constructor', () => {
        let paymentsMock = new Array(10).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RefiRepaymentScheduleMock = new RefiRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        expect(RefiRepaymentScheduleMock.payments).toMatchObject(paymentsMock);
        expect(RefiRepaymentScheduleMock.totalLoanInfo).toMatchObject(totalLoanInfoMock);
        expect(RefiRepaymentScheduleMock.standardPayments).toMatchObject(standardPaymentsMock);
        expect(RefiRepaymentScheduleMock.repaymentSchedule).toMatchObject([]);
        expect(RefiRepaymentScheduleMock.capitalize).toBe(false);
        expect(RefiRepaymentScheduleMock.size).toBe(20);
        expect(RefiRepaymentScheduleMock.accruing).toBe(true);
        expect(RefiRepaymentScheduleMock.interest).toBe(0.04);
    });

    // Getter
    test ('Refi repayment schedule get capitalize', () => {
        let paymentsMock = new Array(10).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RefiRepaymentScheduleMock = new RefiRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let spy = jest.spyOn(RefiRepaymentScheduleMock, 'capitalize', 'get').mockReturnValue(false);
        expect(RefiRepaymentScheduleMock.capitalize).toBe(false);
        spy.mockRestore();
    });

    // Setter
    test ('Refi repayment schedule set capitalize', () => {
        let paymentsMock = new Array(10).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RefiRepaymentScheduleMock = new RefiRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        RefiRepaymentScheduleMock.capitalize = true;
        expect(RefiRepaymentScheduleMock.capitalize).toBe(true);
    });

    // Getter
    test ('Refi repayment schedule get size', () => {
        let paymentsMock = new Array(10).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RefiRepaymentScheduleMock = new RefiRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let spy = jest.spyOn(RefiRepaymentScheduleMock, 'size', 'get').mockReturnValue(2);
        expect(RefiRepaymentScheduleMock.size).toBe(2);
        spy.mockRestore();
    });

    // Setter
    test ('Refi repayment schedule set size', () => {
        let paymentsMock = new Array(10).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RefiRepaymentScheduleMock = new RefiRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        RefiRepaymentScheduleMock.size = 5;
        expect(RefiRepaymentScheduleMock.size).toBe(5);
    });

    // Getter
    test ('Refi repayment schedule get accruing', () => {
        let paymentsMock = new Array(10).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RefiRepaymentScheduleMock = new RefiRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let spy = jest.spyOn(RefiRepaymentScheduleMock, 'accruing', 'get').mockReturnValue(false);
        expect(RefiRepaymentScheduleMock.accruing).toBe(false);
        spy.mockRestore();
    });

    // Setter
    test ('Refi repayment schedule set accruing', () => {
        let paymentsMock = new Array(10).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RefiRepaymentScheduleMock = new RefiRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        RefiRepaymentScheduleMock.accruing = true;
        expect(RefiRepaymentScheduleMock.accruing).toBe(true);
    });

    // Getter
    test ('Refi repayment schedule get interest', () => {
        let paymentsMock = new Array(10).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RefiRepaymentScheduleMock = new RefiRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let spy = jest.spyOn(RefiRepaymentScheduleMock, 'interest', 'get').mockReturnValue(0.1);
        expect(RefiRepaymentScheduleMock.interest).toBe(0.1);
        spy.mockRestore();
    });

    // Setter
    test ('Refi repayment schedule set interest', () => {
        let paymentsMock = new Array(10).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RefiRepaymentScheduleMock = new RefiRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        RefiRepaymentScheduleMock.interest = 0.1;
        expect(RefiRepaymentScheduleMock.interest).toBe(0.1);
    });

    // Method
    test ('Refi repayment schedule monthly interest charge first month', () => {
        let paymentsMock = new Array(10).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RefiRepaymentScheduleMock = new RefiRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { loanPrincipal: 11000 };
        expect(RefiRepaymentScheduleMock.monthlyInterestCharge(obj, true, 0.25).toFixed(2)).toBe("208.33");
    });

    // Method
    test ('Refi repayment schedule monthly interest charge not first month', () => {
        let paymentsMock = new Array(10).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RefiRepaymentScheduleMock = new RefiRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { loanPrincipal: 11000 };
        expect(RefiRepaymentScheduleMock.monthlyInterestCharge(obj, false, 0.25).toFixed(2)).toBe("229.17");
    });

    // Method
    test ('Refi repayment schedule actual monthly payment first month', () => {
        let paymentsMock = new Array(10).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RefiRepaymentScheduleMock = new RefiRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { monthlyInterestCharge: 1000 };
        let obj2 = { loanPrincipal: 1000 };
        expect(RefiRepaymentScheduleMock.actualMonthlyPayment(200, obj, obj2, true).toFixed(2)).toBe("200.00");
    });

    // Method
    test ('Refi repayment schedule actual monthly payment not first month', () => {
        let paymentsMock = new Array(10).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RefiRepaymentScheduleMock = new RefiRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { monthlyInterestCharge: 1000 };
        let obj2 = { loanPrincipal: 1000 };
        expect(RefiRepaymentScheduleMock.actualMonthlyPayment(200, obj, obj2, false).toFixed(2)).toBe("200.00");
    });


    // Method
    test ('Refi repayment schedule loan principal first month', () => {
        let paymentsMock = new Array(10).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RefiRepaymentScheduleMock = new RefiRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { loanPrincipal: 11000 };
        let obj2 = { unpaidInterest: 1000 };
        expect(RefiRepaymentScheduleMock.loanPrincipal(obj2, obj, true).toFixed(2)).toBe("11000.00");
    });

    // Method
    test ('Refi repayment schedule loan principal not first month', () => {
        let paymentsMock = new Array(10).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RefiRepaymentScheduleMock = new RefiRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { loanPrincipal: 11000 };
        let obj2 = { unpaidInterest: 1000 };
        expect(RefiRepaymentScheduleMock.loanPrincipal(obj2, obj, false).toFixed(2)).toBe("12000.00");
    });

    test ('Refi repayment calculate repayment schedule function call', () => {
        let paymentsMock = new Array(20).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RefiRepaymentScheduleMock = new RefiRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);

        let spy = jest.spyOn(RefiRepaymentScheduleMock, 'calculateRepaymentSchedule').mockReturnValue([]);
        expect(RefiRepaymentScheduleMock.calculateRepaymentSchedule()).toMatchObject([]);
        spy.mockRestore();
    });

    test ('Refi repayment calculate repayment schedule function call', () => {
        let paymentsMock = new Array(20).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RefiRepaymentScheduleMock = new RefiRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        const mockRepaymentSchedule = new Array(20);
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
        expect(RefiRepaymentScheduleMock.calculateRepaymentSchedule()).toMatchObject(mockRepaymentSchedule);
    });

});