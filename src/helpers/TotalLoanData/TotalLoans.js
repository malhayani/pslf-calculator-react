class TotalLoans {

    constructor (loans) {
        this.principal = this.totalValue(loans, 'principal');
        this.accruedInterest = this.totalValue(loans, 'accruedInterest');
        this.loanBalance = this.totalValue(loans, 'totalLoanBalance');
        this.interest = this.averageInterestRate(loans);
    }

    get principal () {
        return this._principal;
    }

    set principal (principal) {
        this._principal = principal;
    }

    get accruedInterest () {
        return this._accruedInterest;
    }

    set accruedInterest (accruedInterest) {
        this._accruedInterest = accruedInterest;
    }

    get loanBalance () {
        return this._loanBalance;
    }

    set loanBalance (loanBalance) {
        this._loanBalance = loanBalance;
    }

    get interest () {
        return this._interest;
    }

    set interest (interest) {
        this._interest = interest;
    }

    /* Sum all the values of the specified attribute in an array of objects */
    totalValue (obj, attr) {
        obj = Array.from(obj);
        let arr = obj.map(x => x[attr]);
        return arr.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
    }

    /* Returns average interest rate for all loans */
    averageInterestRate (loans) {
        loans = Array.from(loans);
        let arr = loans.map(loan => loan.principal * loan.interest);
        let val = arr.reduce((a, b) => a + b, 0);
        // prevents the denominator from ever being 0
        let denom = this.totalValue(loans, 'principal') || 1;
        return val / denom;
    }

}

export default TotalLoans;