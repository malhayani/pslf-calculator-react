import React from 'react';

const PaymentEstimatesTable = (props) => {

    const generatePaymentEstimateRows = () => {
        let rows = [];
        for (let i = 0; i < 10; i++) {
            let endOfYearData = {
                actualMonthlyPayment: 'N/A',
                loanPrincipal: 'N/A',
                accruingInterest: 'N/A',
                totalDebt: 'N/A',
                totalPayments: 'N/A'
            }
            if (props.repaymentSchedule) {
                if (props.repaymentSchedule[i]) {
                    if (props.repaymentSchedule[i][11]) {
                        let actualMonthlyPayment = parseFloat(props.repaymentSchedule[i][11].actualMonthlyPayment) || 0;
                        let loanPrincipal = parseFloat(props.repaymentSchedule[i][11].loanPrincipal) || 0;
                        let accruingInterest = parseFloat(props.repaymentSchedule[i][11].accruingInterest) || 0;
                        let totalDebt = loanPrincipal + accruingInterest;
                        let totalPayments = parseFloat(props.repaymentSchedule[i][11].totalPayments) || 0;
                        endOfYearData = {
                            actualMonthlyPayment: actualMonthlyPayment.toFixed(2),
                            loanPrincipal: loanPrincipal.toFixed(2),
                            accruingInterest: accruingInterest.toFixed(2),
                            totalDebt: totalDebt.toFixed(2),
                            totalPayments: totalPayments.toFixed(2)
                        }
                    }
                }
            }
            rows.push(
                <tr key={ props.header + "-" + (props.isMarried.toString() === 'true' ? 'joint' : 'single') + "-payment-estimate-tr-" + i }>
                    <td className="payment-estimates-table-data">End of Year {i + 1}</td>
                    <td className="payment-estimates-table-data">{ endOfYearData.actualMonthlyPayment }</td>
                    <td className="payment-estimates-table-data">{ endOfYearData.loanPrincipal }</td>
                    <td className="payment-estimates-table-data">{ endOfYearData.accruingInterest }</td>
                    <td className="payment-estimates-table-data">{ endOfYearData.totalDebt }</td>
                    <td className="payment-estimates-table-data">{ endOfYearData.totalPayments }</td>
                </tr>
            );
        }
        return rows;
    }

    return (
        <section className="payments-table-container">
            <table className="payments-estimate-table">
                <thead>
                    <tr>
                        <th colSpan="6" className="payments-estimate-table-title">{props.header}</th>
                    </tr>
                    <tr>
                        <th className="payment-estimates-table-header">Time<br/>Period</th>
                        <th className="payment-estimates-table-header">Monthly<br/>Payment</th>
                        <th className="payment-estimates-table-header">Remaining<br/>Principal</th>
                        <th className="payment-estimates-table-header">Accrued<br/>Interest</th>
                        <th className="payment-estimates-table-header">Total<br/>Debt</th>
                        <th className="payment-estimates-table-header">Total<br/>Payments</th>
                    </tr>
                </thead>
                <tbody>
                    { generatePaymentEstimateRows() }
                </tbody>
            </table>
            <br/><br/>
        </section>
    );
}

export default PaymentEstimatesTable;
