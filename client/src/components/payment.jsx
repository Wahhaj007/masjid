import React, { useState } from 'react';
import PaymentForm from './paymentform';
import {
  Button,
  Modal,
  Card
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
      <h1 class="ml-4 mt-3">
        Payment
      </h1>
      <Card className="ml-3 mr-3">
        <div>
          <Button className="mt-3" onClick={setNewPaymentToTrue}
          >New Payment</Button>
        </div>
        <h3 className="ml-4">Payment List</h3>
        <div class="col-md-12 text-center">

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
      </Card>
    </React.Fragment >
  )
}

export default Payment;
