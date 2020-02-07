import RepaymentSchedule from '../../../helpers/RepaymentSchedules/RepaymentSchedule';

describe('Repayment Schedule Parent Test Suite', () => {

    // Constructor Method
    test('Repayment schedule constructor', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepaymentScheduleMock = new RepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        expect(RepaymentScheduleMock.payments).toMatchObject(paymentsMock);
        expect(RepaymentScheduleMock.totalLoanInfo).toMatchObject(totalLoanInfoMock);
        expect(RepaymentScheduleMock.standardPayments).toMatchObject(standardPaymentsMock);
        expect(RepaymentScheduleMock.repaymentSchedule).toMatchObject([]);
    });

    // Getter
    test ('Repayment schedule get payments', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepaymentScheduleMock = new RepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let spy = jest.spyOn(RepaymentScheduleMock, 'payments', 'get').mockReturnValue(10);
        expect(RepaymentScheduleMock.payments).toBe(10);
        spy.mockRestore();
    });

    // Setter
    test ('Repayment schedule set payments', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepaymentScheduleMock = new RepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        RepaymentScheduleMock.payments = 10;
        expect(RepaymentScheduleMock.payments).toBe(10);
    });

    // Getter
    test ('Repayment schedule get total loan info', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepaymentScheduleMock = new RepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let spy = jest.spyOn(RepaymentScheduleMock, 'totalLoanInfo', 'get').mockReturnValue(10);
        expect(RepaymentScheduleMock.totalLoanInfo).toBe(10);
        spy.mockRestore();
    });

    // Setter
    test ('Repayment schedule set total loan info', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepaymentScheduleMock = new RepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        RepaymentScheduleMock.totalLoanInfo = 10;
        expect(RepaymentScheduleMock.totalLoanInfo).toBe(10);
    });

    // Getter
    test ('Repayment schedule get standard payments', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepaymentScheduleMock = new RepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let spy = jest.spyOn(RepaymentScheduleMock, 'standardPayments', 'get').mockReturnValue(10);
        expect(RepaymentScheduleMock.standardPayments).toBe(10);
        spy.mockRestore();
    });
    
    // Setter
    test ('Repayment schedule set standard payments', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepaymentScheduleMock = new RepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        RepaymentScheduleMock.standardPayments = 10;
        expect(RepaymentScheduleMock.standardPayments).toBe(10);
    });

    // Getter
    test ('Repayment schedule get repayment schedule', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepaymentScheduleMock = new RepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let spy = jest.spyOn(RepaymentScheduleMock, 'repaymentSchedule', 'get').mockReturnValue(10);
        expect(RepaymentScheduleMock.repaymentSchedule).toBe(10);
        spy.mockRestore();
    });

    // Setter
    test ('Repayment schedule set repayment schedule', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepaymentScheduleMock = new RepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        RepaymentScheduleMock.repaymentSchedule = 10;
        expect(RepaymentScheduleMock.repaymentSchedule).toBe(10);
    });

    // Method
    test ('Repayment schedule monthly interest charge first month', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 0,
            accruedInterest: 0,
            interest: 0,
            loanBalance: 0
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepaymentScheduleMock = new RepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { loanPrincipal: 11000 };
        expect(RepaymentScheduleMock.monthlyInterestCharge(obj, true)).toBe(0);
    });

    // Method
    test ('Repayment schedule monthly interest charge not first month', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 10000,
            accruedInterest: 1000,
            interest: 0.25,
            loanBalance: 11000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepaymentScheduleMock = new RepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { loanPrincipal: 11000 };
        expect(RepaymentScheduleMock.monthlyInterestCharge(obj, false).toFixed(2)).toBe("229.17");
    });

    // Method
    test ('Repayment schedule capitalize interest first month', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 10000,
            accruedInterest: 1000,
            interest: 0.25,
            loanBalance: 11000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepaymentScheduleMock = new RepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { actualMonthlyPayment: 11000 };
        expect(RepaymentScheduleMock.capitalizeInterest(obj, true)).toBeFalsy();
    });


    // Method
    test ('Repayment schedule capitalize interest not first month', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 10000,
            accruedInterest: 1000,
            interest: 0.25,
            loanBalance: 11000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepaymentScheduleMock = new RepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { actualMonthlyPayment: 11000 };
        expect(RepaymentScheduleMock.capitalizeInterest(obj, false)).toBeTruthy();
    });

    // Method
    test ('Repayment schedule unpaid interest', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 10000,
            accruedInterest: 1000,
            interest: 0.25,
            loanBalance: 11000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepaymentScheduleMock = new RepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { 
            actualMonthlyPayment: 1000, 
            monthlyInterestCharge: 11000 
        };
        expect(RepaymentScheduleMock.unpaidInterest(obj)).toBe(10000);
    });
    
    // Method
    test ('Repayment schedule has interest capitalized first month', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 10000,
            accruedInterest: 1000,
            interest: 0.25,
            loanBalance: 11000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepaymentScheduleMock = new RepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { loanPrincipal: 20000 };
        expect(RepaymentScheduleMock.hasInterestCapitlized(obj, true)).toBeTruthy();
    });

    // Method
    test ('Repayment schedule has interest capitalized not first month', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 10000,
            accruedInterest: 1000,
            interest: 0.25,
            loanBalance: 11000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepaymentScheduleMock = new RepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { loanPrincipal: 20000 };
        expect(RepaymentScheduleMock.hasInterestCapitlized(obj, false)).toBeTruthy();
    });

    // Method
    test ('Repayment schedule has interest capitalized current principal is total principal', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 10000,
            accruedInterest: 1000,
            interest: 0.25,
            loanBalance: 11000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepaymentScheduleMock = new RepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { loanPrincipal: 10000 };
        expect(RepaymentScheduleMock.hasInterestCapitlized(obj, false)).toBeFalsy();
    });

    // Method
    test ('Repayment schedule total payments first month', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 10000,
            accruedInterest: 1000,
            interest: 0.25,
            loanBalance: 11000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepaymentScheduleMock = new RepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { actualMonthlyPayment: 200 };
        let obj2 = { totalPayments: 1000 };
        expect(RepaymentScheduleMock.totalPayments(obj, obj2, true)).toBe(200);
    });

    // Method
    test ('Repayment schedule total payments not first month', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 10000,
            accruedInterest: 1000,
            interest: 0.25,
            loanBalance: 11000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepaymentScheduleMock = new RepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
        let obj = { actualMonthlyPayment: 200 };
        let obj2 = { totalPayments: 1000 };
        expect(RepaymentScheduleMock.totalPayments(obj, obj2, false)).toBe(1200);
    });

    test ('Repayment schedule init data structure capitalize and accruing', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 10000,
            accruedInterest: 1000,
            interest: 0.25,
            loanBalance: 11000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepaymentScheduleMock = new RepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
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
                    capitalizeInterest: false,
                    hasInterestCapitlized: false,
                    accruingInterest: 0
                }
                mockRepaymentSchedule[c].push(obj)
            }
        }
        expect(RepaymentScheduleMock.initRepaymentSchedule(true, 25, true)).toMatchObject(mockRepaymentSchedule);
    });

    test ('Repayment schedule init data structure capitalize and not accruing', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 10000,
            accruedInterest: 1000,
            interest: 0.25,
            loanBalance: 11000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepaymentScheduleMock = new RepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
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
                    capitalizeInterest: false,
                    hasInterestCapitlized: false
                }
                mockRepaymentSchedule[c].push(obj)
            }
        }
        expect(RepaymentScheduleMock.initRepaymentSchedule(true, 25, false)).toMatchObject(mockRepaymentSchedule);
    });

    test ('Repayment schedule init data structure not capitalize and accruing', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 10000,
            accruedInterest: 1000,
            interest: 0.25,
            loanBalance: 11000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepaymentScheduleMock = new RepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
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
        expect(RepaymentScheduleMock.initRepaymentSchedule(false, 25, true)).toMatchObject(mockRepaymentSchedule);
    });

    test ('Repayment schedule init data structure not capitalize and not accruing', () => {
        let paymentsMock = new Array(25).fill(0);
        let totalLoanInfoMock = {
            principal: 10000,
            accruedInterest: 1000,
            interest: 0.25,
            loanBalance: 11000
        };
        let standardPaymentsMock = new Array(10).fill(0);
        const RepaymentScheduleMock = new RepaymentSchedule(paymentsMock, totalLoanInfoMock, standardPaymentsMock);
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
                    totalPayments: 0
                }
                mockRepaymentSchedule[c].push(obj)
            }
        }
        expect(RepaymentScheduleMock.initRepaymentSchedule(false, 25, false)).toMatchObject(mockRepaymentSchedule);
    });

});