import React from 'react';
import SingleColumnTable from '../../components/SingleColumnTable';

const PaymentDetails = (props) => {

    const generatePaymentsTables = () => {
        let paymentMetaData = [];
        // Standard Payments
        paymentMetaData.push({
            header: "Standard",
            filingStatus: "",
            data: props.payments.standardPayments
        });
        // Re-financed Payments
        paymentMetaData.push({
            header: "Refinance",
            filingStatus: "",
            data: props.payments.refiPayments
        });
        // PAYE Payments
        if (props.isMarried.toString() === 'true') {
            paymentMetaData.push({
                header: "PAYE",
                filingStatus: "Joint",
                data: props.payments.payeMFJPayments
            });
        }
        paymentMetaData.push({
            header: "PAYE",
            filingStatus: "Single",
            data: props.payments.payeMFSPayments
        });
        // REPAYE Payments
        paymentMetaData.push({
            header: "REPAYE",
            filingStatus: "",
            data: props.payments.repayePayments
        });
        // IBR Payments
        if (props.isMarried.toString() === 'true') {
            paymentMetaData.push({
                header: "IBR",
                filingStatus: "Joint",
                data: props.payments.ibrMFJPayments
            });
        }
        paymentMetaData.push({
            header: "IBR",
            filingStatus: "Single",
            data: props.payments.ibrMFSPayments
        });
        // ICR Payments
        if (props.isMarried.toString() === 'true') {
            paymentMetaData.push({
                header: "ICR",
                filingStatus: "Joint",
                data: props.payments.icrMFJPayments
            });
        }
        paymentMetaData.push({
            header: "ICR",
            filingStatus: "Single",
            data: props.payments.icrMFSPayments
        });
        // Return the payment tables
        return paymentMetaData.map(payment => {
            return (
                <SingleColumnTable 
                    key={ payment.header + "-" + payment.filingStatus}
                    data={ payment.data }
                    header={ payment.header }
                    filingStatus={ payment.filingStatus }
                    type="money"
                />
            );
        });
    }

    return (
        <section className="payments-table-container">
            <SingleColumnTable 
                data={ Array(26).fill().map((_, i) => i + 1) }
                header='Year'
                filingStatus=""
                type="year"
            />
            { generatePaymentsTables() }
            <br/><br/>
        </section>
    )
}

export default PaymentDetails;
