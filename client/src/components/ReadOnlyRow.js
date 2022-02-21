import React from 'react';
import Button from "react-bootstrap/Button";

const ReadOnlyRow = ({ payment, index, handleEditClick }) => {
    return (
        <tr key={index}>
            <td>{payment.createAt.slice(0, 10)}</td>
            <td>{payment.Firstname}</td>
            <td>{payment.Lastname}</td>
            <td>{payment.Description}</td>
            <td>{payment.PaymentMethod}</td>
            <td>{payment.Email}</td>
            <td>{'$' + payment.Amount}</td>
            <td>{payment.Comment}</td>
            <td>
                <Button type="button" className="d-flex justify content center" onClick={(event) => handleEditClick(event, payment)}>
                    Edit
                </Button>
            </td>
        </tr>
    )
}

export default ReadOnlyRow