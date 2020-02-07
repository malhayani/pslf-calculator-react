import React from 'react';
import PaymentsTable from '../../../PaymentsTable';

const PaymentDetails = (props) => {

    const generatePaymentsTables = () => {
        let paymentTables = [];
        paymentTables.push(<PaymentsTable payments={props.payments.standardPayments} title="Standard Payments" filingStatus=""/>);
        paymentTables.push(<PaymentsTable payments={props.payments.refiPayments} title="Refinance Payments" filingStatus=""/>);
        if (props.isMarried.toString() === 'true') paymentTables.push(<PaymentsTable payments={props.payments.payeMFJPayments} title="PAYE Payments" filingStatus="Joint"/>);
        paymentTables.push(<PaymentsTable payments={props.payments.payeMFSPayments} title="PAYE Payments" filingStatus="Single"/>);
        paymentTables.push(<PaymentsTable payments={props.payments.repayePayments} title="REPAYE Payments" filingStatus=""/>);
        if (props.isMarried.toString() === 'true') paymentTables.push(<PaymentsTable payments={props.payments.ibrMFJPayments} title="IBR Payments" filingStatus="Joint"/>);
        paymentTables.push(<PaymentsTable payments={props.payments.ibrMFSPayments} title="IBR Payments" filingStatus="Single"/>);
        if (props.isMarried.toString() === 'true') paymentTables.push(<PaymentsTable payments={props.payments.icrMFJPayments} title="ICR Payments" filingStatus="Joint"/>);
        paymentTables.push(<PaymentsTable payments={props.payments.icrMFSPayments} title="ICR Payments" filingStatus="Single"/>);
    }

    return (
        <section>
            { generatePaymentsTables() }
        </section>
    )
}

export default PaymentDetails;
