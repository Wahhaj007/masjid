import React, { useState } from 'react';
import PaymentForm from './paymentform';
import {
  Button,
  Modal
} from "react-bootstrap";
import Table from './table'
function Payment() {

  const [newPayment, setNewPayment] = useState(false);

  const setNewPaymentToTrue = () => {
    setNewPayment(true)
  }

  const setNewPaymentToFalse = () => {
    setNewPayment(false)
  }

  return (
    <React.Fragment>
      <div
        style={{ justifyContent: "center", alignItems: "center" }}>
        <Button onClick={setNewPaymentToTrue}
        >New Payment</Button>
        <Table />
      </div>
      <Modal show={newPayment}>
        <Modal.Header>
          <h2>
            New Payment
          </h2>

          <Button onClick={setNewPaymentToFalse} variant='outline-danger'>X</Button>
        </Modal.Header>
        <Modal.Body>
          <PaymentForm />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  )
}

export default Payment;
