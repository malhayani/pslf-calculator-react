import PayeRepaymentSchedule from '../../../helpers/RepaymentSchedules/PayeRepaymentSchedule';

describe('Paye repayment Schedule Parent Test Suite', () => {

     // Constructor Method
     test('Paye repayment schedule constructor', () => {
        let paymentsMock = new Array(20).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const PayeRepaymentScheduleMock = new PayeRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        expect(PayeRepaymentScheduleMock.payments).toMatchObject(paymentsMock);
        expect(PayeRepaymentScheduleMock.totalLoanInfo).toMatchObject(totalLoanInfoMock);
        expect(PayeRepaymentScheduleMock.standardPayments).toMatchObject(standardPaymentsMock);
        expect(PayeRepaymentScheduleMock.repaymentSchedule).toMatchObject([]);
        expect(PayeRepaymentScheduleMock.capitalize).toBe(true);
        expect(PayeRepaymentScheduleMock.size).toBe(20);
        expect(PayeRepaymentScheduleMock.accruing).toBe(true);
    });

    // Getter
    test ('Paye repayment schedule get capitalize', () => {
        let paymentsMock = new Array(20).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const PayeRepaymentScheduleMock = new PayeRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let spy = jest.spyOn(PayeRepaymentScheduleMock, 'capitalize', 'get').mockReturnValue(false);
        expect(PayeRepaymentScheduleMock.capitalize).toBe(false);
        spy.mockRestore();
    });

    // Setter
    test ('Paye repayment schedule set capitalize', () => {
        let paymentsMock = new Array(20).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const PayeRepaymentScheduleMock = new PayeRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        PayeRepaymentScheduleMock.capitalize = true;
        expect(PayeRepaymentScheduleMock.capitalize).toBe(true);
    });

    // Getter
    test ('Paye repayment schedule get size', () => {
        let paymentsMock = new Array(20).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const PayeRepaymentScheduleMock = new PayeRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let spy = jest.spyOn(PayeRepaymentScheduleMock, 'size', 'get').mockReturnValue(2);
        expect(PayeRepaymentScheduleMock.size).toBe(2);
        spy.mockRestore();
    });

    // Setter
    test ('Paye repayment schedule set size', () => {
        let paymentsMock = new Array(20).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const PayeRepaymentScheduleMock = new PayeRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        PayeRepaymentScheduleMock.size = 5;
        expect(PayeRepaymentScheduleMock.size).toBe(5);
    });

    // Getter
    test ('Paye repayment schedule get accruing', () => {
        let paymentsMock = new Array(20).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const PayeRepaymentScheduleMock = new PayeRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let spy = jest.spyOn(PayeRepaymentScheduleMock, 'accruing', 'get').mockReturnValue(false);
        expect(PayeRepaymentScheduleMock.accruing).toBe(false);
        spy.mockRestore();
    });

    // Setter
    test ('Paye repayment schedule set accruing', () => {
        let paymentsMock = new Array(20).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const PayeRepaymentScheduleMock = new PayeRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        PayeRepaymentScheduleMock.accruing = true;
        expect(PayeRepaymentScheduleMock.accruing).toBe(true);
    });

    // Method
    test ('Paye repayment schedule actual monthly interest first month', () => {
        let paymentsMock = new Array(20).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const PayeRepaymentScheduleMock = new PayeRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { monthlyInterestCharge: 1000 };
        let obj2 = { loanPrincipal: 10000 };
        expect(PayeRepaymentScheduleMock.actualMonthlyPayment(200, obj, obj2, true).toFixed(2)).toBe("200.00");
    });

    // Method
    test ('Paye repayment schedule actual monthly interest not first month', () => {
        let paymentsMock = new Array(20).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const PayeRepaymentScheduleMock = new PayeRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { monthlyInterestCharge: 1000 };
        let obj2 = { loanPrincipal: 10000 };
        expect(PayeRepaymentScheduleMock.actualMonthlyPayment(200, obj, obj2, false).toFixed(2)).toBe("200.00");
    });

    // Method
    test ('Paye repayment schedule accuring interest first month', () => {
        let paymentsMock = new Array(20).fill(0);
        let totalLoanInfoMock = {
            principal: 1000,
            accruedInterest: 1000,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const PayeRepaymentScheduleMock = new PayeRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { accruingInterest: 11000 };
        let obj2 = { unpaidInterest: 1000 };
        expect(PayeRepaymentScheduleMock.accruingInterest(obj2, obj, true).toFixed(2)).toBe("2000.00");
    });

    // Method
    test ('Paye repayment schedule accuring interest not first month', () => {
        let paymentsMock = new Array(20).fill(0);
        let totalLoanInfoMock = {
            principal: 1000,
            accruedInterest: 1000,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const PayeRepaymentScheduleMock = new PayeRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { accruingInterest: 11000 };
        let obj2 = { unpaidInterest: 1000 };
        expect(PayeRepaymentScheduleMock.accruingInterest(obj2, obj, false).toFixed(2)).toBe("12000.00");
    });

    // Method
    test ('Paye repayment schedule accuring interest not first month with no current unpaid interest', () => {
        let paymentsMock = new Array(20).fill(0);
        let totalLoanInfoMock = {
            principal: 1000,
            accruedInterest: 1000,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const PayeRepaymentScheduleMock = new PayeRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { accruingInterest: 11000 };
        let obj2 = { unpaidInterest: 0 };
        expect(PayeRepaymentScheduleMock.accruingInterest(obj2, obj, false).toFixed(2)).toBe("11000.00");
    });

    // Method
    test ('Paye repayment schedule loan principal first month', () => {
        let paymentsMock = new Array(20).fill(0);
        let totalLoanInfoMock = {
            principal: 1000,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const PayeRepaymentScheduleMock = new PayeRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { loanPrincipal: 11000 };
        let obj2 = {
            unpaidInterest: 1000,
            accruingInterest: 1000 
        };
        expect(PayeRepaymentScheduleMock.loanPrincipal(obj2, obj, true).toFixed(2)).toBe("1000.00");
    });

    // Method
    test ('Paye repayment schedule loan principal not first month', () => {
        let paymentsMock = new Array(20).fill(0);
        let totalLoanInfoMock = {
            principal: 1000,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const PayeRepaymentScheduleMock = new PayeRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { loanPrincipal: 11000 };
        let obj2 = {
            unpaidInterest: 1000,
            accruingInterest: 1000 
        };
        expect(PayeRepaymentScheduleMock.loanPrincipal(obj2, obj, false).toFixed(2)).toBe("11000.00");
    });

    // Method
    test ('Paye repayment schedule loan principal not first month with no accuring interest', () => {
        let paymentsMock = new Array(20).fill(0);
        let totalLoanInfoMock = {
            principal: 1000,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const PayeRepaymentScheduleMock = new PayeRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { loanPrincipal: 11000 };
        let obj2 = {
            unpaidInterest: 1000,
            accruingInterest: 0 
        };
        expect(PayeRepaymentScheduleMock.loanPrincipal(obj2, obj, false).toFixed(2)).toBe("12000.00");
    });

    test ('Paye repayment calculate repayment schedule function call', () => {
        let paymentsMock = new Array(20).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 10000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const PayeRepaymentScheduleMock = new PayeRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);

        let spy = jest.spyOn(PayeRepaymentScheduleMock, 'calculateRepaymentSchedule').mockReturnValue([]);
        expect(PayeRepaymentScheduleMock.calculateRepaymentSchedule()).toMatchObject([]);
        spy.mockRestore();
    });

    test ('Paye repayment calculate repayment schedule function call', () => {
        let paymentsMock = new Array(20).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const PayeRepaymentScheduleMock = new PayeRepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
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
                    totalPayments: 0,
                    accruingInterest: 0
                }
                mockRepaymentSchedule[c].push(obj)
            }
        }
        expect(PayeRepaymentScheduleMock.calculateRepaymentSchedule()).toMatchObject(mockRepaymentSchedule);
    });

});