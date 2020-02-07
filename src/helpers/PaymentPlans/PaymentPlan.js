class PaymentPlan {
    
    constructor (currentInfo, totalLoanInfo) {
        this.currentInfo = currentInfo;
        this.totalLoanInfo = totalLoanInfo;
        this.paymentPlan = [];
        this.povertyGuideline = 12490;
        this.povertyPerPerson = 4420;
        this.povertyInflationRate = 0.02;
    }

    get currentInfo () {
        return this._currentInfo;
    }

    set currentInfo (currentInfo) {
        this._currentInfo = currentInfo;
    }

    get totalLoanInfo () {
        return this._totalLoanInfo;
    }

    set totalLoanInfo (totalLoanInfo) {
        this._totalLoanInfo = totalLoanInfo;
    }

    get paymentPlan () {
        return this._paymentPlan;
    }

    set paymentPlan (paymentPlan) {
        this._paymentPlan = paymentPlan;
    }

    get povertyGuideline () {
        return this._povertyGuideline;
    }

    set povertyGuideline (povertyGuideline) {
        this._povertyGuideline = povertyGuideline;
    }

    get povertyPerPerson () {
        return this._povertyPerPerson;
    }

    set povertyPerPerson (povertyPerPerson) {
        this._povertyPerPerson = povertyPerPerson;
    }

    get povertyInflationRate () {
        return this._povertyInflationRate;
    }

    set povertyInflationRate (povertyInflationRate) {
        this._povertyInflationRate = povertyInflationRate;
    }

    // Translated Excel Payment Function
    paymentFunction (avgInt, duration, balance) {
        let val = Math.abs((balance * (avgInt / 12)) / (1 - Math.pow((1 + (avgInt / 12)), duration)));
        return val ? val : 0.00;
    }

}

export default PaymentPlan;