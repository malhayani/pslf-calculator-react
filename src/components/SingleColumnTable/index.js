import React from 'react';

const SingleColumnTable = (props) => {

    const generateTableRows = () => {
        let rows = [];
        for (let i = 0; i < props.data.length; i++) {
            rows.push(
                <tr key={props.header+"-"+props.filingStatus+"-tr-"+i}>
                    <td key={props.header+"-"+props.filingStatus+"-td-"+i}>{ props.type === 'money' ? props.data[i].toFixed(2) : props.data[i] }</td>
                </tr>
            );
        }
        return rows;
    }

    return (
        <table className="single-col-table">
            <thead>
                <tr>
                    <th className="single-col-table-header">{props.header}{props.filingStatus !== '' ? props.filingStatus === 'Single' ? ' (MFS)' : ' (MFJ)' : '' }</th>
                </tr>
            </thead>
            <tbody>
                { generateTableRows() }
            </tbody>
        </table>
    )
}

export default SingleColumnTable;