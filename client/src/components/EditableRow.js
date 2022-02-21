import React from 'react';
import Button from "react-bootstrap/Button";
import './payment.css';
import FormControl from 'react-bootstrap/FormControl';


const EditableRow = ({ payment, editFormData, handleEditFormChange, handleCancelClick }) => {
    return (
        <>
            <tr>
                <td>{payment.createAt.slice(0, 10)}</td>
                <td>{payment.Firstname}</td>
                <td>{payment.Lastname}</td>
                <td>{payment.Description}</td>
                <td>{payment.PaymentMethod}</td>
                <td>{payment.Email}</td>
                <td>{'$' + payment.Amount}</td>
                <td>
                    <div>
                        <FormControl
                            as="textarea"
                            className="d-flex justify content center"
                            placeholder="Enter a comment"
                            name="Comment"
                            value={editFormData.Comment}
                            onChange={handleEditFormChange} />
                    </div>
                </td>
                <td>
                    <Button className="d-flex justify content center mb-4" variant="primary" type="submit">Save</Button>
                    {/* <Button variant="primary" type="reset" onClick={(() => handleCancelClick)} >Cancel</Button> TODO FIX THE CANCEL BUTTON*/}
                </td>
            </tr>
        </>
    )
}

export default EditableRow                    