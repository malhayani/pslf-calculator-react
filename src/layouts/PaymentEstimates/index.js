import React, {useState} from 'react';
import PaymentDetails from '../PaymentDetails';
import PaymentEstimatesTable from '../../components/PaymentEstimatesTable';

const PaymentEstimates = (props) => {
    const [showPaymentDetails, setShowPaymentDetails] = useState(false);
    return (
        <section className="payments-table-container">
            <button
                className="btn btn-tertiary details-btn"
                onClick={() => setShowPaymentDetails(!showPaymentDetails)}
            >
                { showPaymentDetails ? 'BACK TO PAYMENT ESTIMATES' : 'SEE PAYMENT DETAILS'}
            </button>
            {
                showPaymentDetails
                    ? <PaymentDetails payments={props.payments} isMarried={props.isMarried}/>
                    : (
                        <section>
                            <PaymentEstimatesTable repaymentSchedule={props.repaymentSchedules.standardRepaymentSchedule} header="Standard" isMarried={props.isMarried}/>
                            <PaymentEstimatesTable repaymentSchedule={props.repaymentSchedules.refiRepaymentSchedule} header="Refinance" isMarried={props.isMarried}/>
                            { props.isMarried.toString() === 'true' ? <PaymentEstimatesTable repaymentSchedule={props.repaymentSchedules.payeMFJRepaymentSchedule} header="PAYE MFJ" isMarried={props.isMarried}/> : "" }
                            <PaymentEstimatesTable repaymentSchedule={props.repaymentSchedules.payeMFSRepaymentSchedule} header="PAYE MFS" isMarried={props.isMarried}/>
                            <PaymentEstimatesTable repaymentSchedule={props.repaymentSchedules.repayeRepaymentSchedule} header="REPAYE" isMarried={props.isMarried}/>
                            { props.isMarried.toString() === 'true' ? <PaymentEstimatesTable repaymentSchedule={props.repaymentSchedules.ibrMFJRepaymentSchedule} header="IBR MFJ" isMarried={props.isMarried}/> : "" }
                            <PaymentEstimatesTable repaymentSchedule={props.repaymentSchedules.ibrMFSRepaymentSchedule} header="IBR MFS" isMarried={props.isMarried}/>
                            { props.isMarried.toString() === 'true' ? <PaymentEstimatesTable repaymentSchedule={props.repaymentSchedules.icrMFJRepaymentSchedule} header="ICR MFJ" isMarried={props.isMarried}/> : "" }
                            <PaymentEstimatesTable repaymentSchedule={props.repaymentSchedules.icrMFSRepaymentSchedule} header="ICR MFS" isMarried={props.isMarried}/>
                        </section>
                    )
            }
        </section>
    )
}

export default PaymentEstimates;
