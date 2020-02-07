import TotalLoans from '../../../helpers/TotalLoanData/TotalLoans';

describe('Total Loans Test Suite', () => {

    // Constructor Method
    test('Total loans constructor', () => {
        const totalLoansMock = new TotalLoans([
            {
                principal: 0,
                accruedInterest: 0,
                interest: 0,
                totalLoanBalance: 0
            }
        ]);
        expect(totalLoansMock.principal).toBe(0);
        expect(totalLoansMock.accruedInterest).toBe(0);
        expect(totalLoansMock.loanBalance).toBe(0);
        expect(totalLoansMock.interest).toBe(0);
    });

    // Getter
    test ('Total loans get principal', () => {
        const totalLoansMock = new TotalLoans([]);
        let spy = jest.spyOn(totalLoansMock, 'principal', 'get').mockReturnValue(10);
        expect(totalLoansMock.principal).toBe(10);
        spy.mockRestore();
    });

    // Setter
    test ('Total loans set principal', () => {
        const totalLoansMock = new TotalLoans([]);
        totalLoansMock.principal = 10;
        expect(totalLoansMock.principal).toBe(10);
    });

    // Getter
    test ('Total loans get accrued interest', () => {
        const totalLoansMock = new TotalLoans([]);
        let spy = jest.spyOn(totalLoansMock, 'accruedInterest', 'get').mockReturnValue(10);
        expect(totalLoansMock.accruedInterest).toBe(10);
        spy.mockRestore();
    });

    // Setter
    test ('Total loans set accrued interest', () => {
        const totalLoansMock = new TotalLoans([]);
        totalLoansMock.accruedInterest = 10;
        expect(totalLoansMock.accruedInterest).toBe(10);
    });

    // Getter
    test ('Total loans get loan balance', () => {
        const totalLoansMock = new TotalLoans([]);
        let spy = jest.spyOn(totalLoansMock, 'loanBalance', 'get').mockReturnValue(10);
        expect(totalLoansMock.loanBalance).toBe(10);
        spy.mockRestore();
    });
    
    // Setter
    test ('Total loans set loan balance', () => {
        const totalLoansMock = new TotalLoans([]);
        totalLoansMock.loanBalance = 10;
        expect(totalLoansMock.loanBalance).toBe(10);
    });

    // Getter
    test ('Total loans get interest', () => {
        const totalLoansMock = new TotalLoans([]);
        let spy = jest.spyOn(totalLoansMock, 'interest', 'get').mockReturnValue(10);
        expect(totalLoansMock.interest).toBe(10);
        spy.mockRestore();
    });

    // Setter
    test ('Total loans set interest', () => {
        const totalLoansMock = new TotalLoans([]);
        totalLoansMock.interest = 10;
        expect(totalLoansMock.interest).toBe(10);
    });

    // Method
    test ('Total loans total value method', () => {
        const totalLoansMock = new TotalLoans([]);
        let obj = [
            {
                principal: 1,
                interest: 2
            },
            {
                principal: 1,
                interest: 2
            }
        ]
        expect(totalLoansMock.totalValue(obj, 'principal')).toBe(2);
    });

    // Method
    test ('Total loans average interest rate method', () => {
        const totalLoansMock = new TotalLoans([]);
        let obj = [
            {
                principal: 200,
                interest: 0.50
            },
            {
                principal: 100,
                interest: 0.20
            }
        ]
        expect(totalLoansMock.averageInterestRate(obj)).toBe(0.40);
    });
});