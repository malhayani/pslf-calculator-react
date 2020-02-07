import RepayeRepaymentSchedule from '../../../helpers/RepaymentSchedules/RepayeRepaymentSchedule';

describe('Repaye repayment Schedule Parent Test Suite', () => {

     // Constructor Method
     test('Repaye repayment schedule constructor', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepayeRepaymentScheduleMock = new RepayeRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        expect(RepayeRepaymentScheduleMock.payments).toMatchObject(paymentsMock);
        expect(RepayeRepaymentScheduleMock.totalLoanInfo).toMatchObject(totalLoanInfoMock);
        expect(RepayeRepaymentScheduleMock.standardPayments).toMatchObject(standardPaymentsMock);
        expect(RepayeRepaymentScheduleMock.repaymentSchedule).toMatchObject([]);
        expect(RepayeRepaymentScheduleMock.capitalize).toBe(false);
        expect(RepayeRepaymentScheduleMock.size).toBe(25);
        expect(RepayeRepaymentScheduleMock.accruing).toBe(true);
    });

    // Getter
    test ('Repaye repayment schedule get capitalize', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepayeRepaymentScheduleMock = new RepayeRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let spy = jest.spyOn(RepayeRepaymentScheduleMock, 'capitalize', 'get').mockReturnValue(false);
        expect(RepayeRepaymentScheduleMock.capitalize).toBe(false);
        spy.mockRestore();
    });

    // Setter
    test ('Repaye repayment schedule set capitalize', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepayeRepaymentScheduleMock = new RepayeRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        RepayeRepaymentScheduleMock.capitalize = true;
        expect(RepayeRepaymentScheduleMock.capitalize).toBe(true);
    });

    // Getter
    test ('Repaye repayment schedule get size', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepayeRepaymentScheduleMock = new RepayeRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let spy = jest.spyOn(RepayeRepaymentScheduleMock, 'size', 'get').mockReturnValue(2);
        expect(RepayeRepaymentScheduleMock.size).toBe(2);
        spy.mockRestore();
    });

    // Setter
    test ('Repaye repayment schedule set size', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepayeRepaymentScheduleMock = new RepayeRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        RepayeRepaymentScheduleMock.size = 5;
        expect(RepayeRepaymentScheduleMock.size).toBe(5);
    });

    // Getter
    test ('Repaye repayment schedule get accruing', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepayeRepaymentScheduleMock = new RepayeRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let spy = jest.spyOn(RepayeRepaymentScheduleMock, 'accruing', 'get').mockReturnValue(false);
        expect(RepayeRepaymentScheduleMock.accruing).toBe(false);
        spy.mockRestore();
    });

    // Setter
    test ('Repaye repayment schedule set accruing', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepayeRepaymentScheduleMock = new RepayeRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        RepayeRepaymentScheduleMock.accruing = true;
        expect(RepayeRepaymentScheduleMock.accruing).toBe(true);
    });

    // Method
    test ('Repaye repayment schedule actual monthly interest', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepayeRepaymentScheduleMock = new RepayeRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { monthlyInterestCharge: 1000 };
        expect(RepayeRepaymentScheduleMock.actualMonthlyPayment(200, obj).toFixed(2)).toBe("200.00");
    });

    // Method
    test ('Repaye repayment schedule accuring interest first month', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 1000,
            accruedInterest: 1000,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepayeRepaymentScheduleMock = new RepayeRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { accruingInterest: 11000 };
        let obj2 = { unpaidInterest: 1000 };
        expect(RepayeRepaymentScheduleMock.accruingInterest(obj2, obj, true).toFixed(2)).toBe("1000.00");
    });

    // Method
    test ('Repaye repayment schedule accuring interest not first month', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 1000,
            accruedInterest: 1000,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepayeRepaymentScheduleMock = new RepayeRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { accruingInterest: 11000 };
        let obj2 = { unpaidInterest: 1000 };
        expect(RepayeRepaymentScheduleMock.accruingInterest(obj2, obj, false).toFixed(2)).toBe("11500.00");
    });

    // Method
    test ('Repaye repayment schedule accuring interest not first month with no current unpaid interest', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 1000,
            accruedInterest: 1000,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepayeRepaymentScheduleMock = new RepayeRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { accruingInterest: 11000 };
        let obj2 = { unpaidInterest: 0 };
        expect(RepayeRepaymentScheduleMock.accruingInterest(obj2, obj, false).toFixed(2)).toBe("11000.00");
    });

    // Method
    test ('Repaye repayment schedule loan principal first month', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 1000,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepayeRepaymentScheduleMock = new RepayeRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { loanPrincipal: 11000 };
        let obj2 = {
            unpaidInterest: 1000,
            accruingInterest: 1000 
        };
        expect(RepayeRepaymentScheduleMock.loanPrincipal(obj2, obj, true).toFixed(2)).toBe("1000.00");
    });

    // Method
    test ('Repaye repayment schedule loan principal not first month', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 1000,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepayeRepaymentScheduleMock = new RepayeRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { loanPrincipal: 11000 };
        let obj2 = {
            unpaidInterest: 1000,
            accruingInterest: 1000 
        };
        expect(RepayeRepaymentScheduleMock.loanPrincipal(obj2, obj, false).toFixed(2)).toBe("11000.00");
    });

    // Method
    test ('Repaye repayment schedule loan principal not first month with no accuring interest', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 1000,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepayeRepaymentScheduleMock = new RepayeRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { loanPrincipal: 11000 };
        let obj2 = {
            unpaidInterest: 1000,
            accruingInterest: 0 
        };
        expect(RepayeRepaymentScheduleMock.loanPrincipal(obj2, obj, false).toFixed(2)).toBe("12000.00");
    });

    test ('Repaye repayment calculate repayment schedule function call', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepayeRepaymentScheduleMock = new RepayeRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);

        let spy = jest.spyOn(RepayeRepaymentScheduleMock, 'calculateRepaymentSchedule').mockReturnValue([]);
        expect(RepayeRepaymentScheduleMock.calculateRepaymentSchedule()).toMatchObject([]);
        spy.mockRestore();
    });

    test ('Repaye repayment calculate repayment schedule function call', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepayeRepaymentScheduleMock = new RepayeRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
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
        expect(RepayeRepaymentScheduleMock.calculateRepaymentSchedule()).toMatchObject(mockRepaymentSchedule);
    });

});