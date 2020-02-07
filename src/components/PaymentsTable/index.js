import React from 'react';

const PaymentsTable = (props) => {

    const generateTableRows = () => {
        let rows = [];
        for (let i = 0; i < props.payments.length; i++) {
            rows.push(
                <div>
                    hi
                </div>
            );
        }
    }

    return (
        <div>hi</div>
    )
}

export default PaymentsTable;