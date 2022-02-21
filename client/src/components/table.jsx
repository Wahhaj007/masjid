import React, { useState, useEffect, Fragment } from 'react';
import './payment.css';
import axios from "axios";
import _ from "lodash";
import ReadOnlyRow from './ReadOnlyRow.js';
import EditableRow from './EditableRow.js';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const pageSize = 10;
const Table = () => {

   const [payments, setPayments] = useState();
   const [paginatedPosts, setPaginatedPosts] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);

   useEffect(() => {

      const getAllPayments = async () => {
         try {
            const res = await axios.get("/payments");
            setPayments(res.data);
            setPaginatedPosts(_(res.data).slice(0).take(pageSize).value());
            console.log("refreshed");
         } catch (e) {
            console.log(e);
         }
      };
      getAllPayments();
   }, []);


   const [editFormData, setEditFormData] = useState({
      Description: "",
      PaymentMethod: "",
      Firstname: "",
      Lastname: "",
      Email: "",
      Amount: "",
      Status: "Processing",
      Type: "Outgoing",
      Comment: ""
   })

   const [editPaymentId, setEditPaymentId] = useState(null);

   const pageCount = payments ? Math.ceil(payments.length / pageSize) : 0;
   if (pageCount === 1) return null;
   const pages = _.range(1, pageCount + 1);

   const pagination = (pageNumber) => {
      setCurrentPage(pageNumber);
      const startIndex = (pageNumber - 1) * pageSize;
      const paginatedPost = _(payments).slice(startIndex).take(pageSize).value();
      setPaginatedPosts(paginatedPost);
   }

   const handleEditFormChange = (event) => {
      event.preventDefault();

      const fieldName = event.target.getAttribute("name");
      const fieldValue = event.target.value;

      const newFormData = { ...editFormData };
      newFormData[fieldName] = fieldValue;

      setEditFormData(newFormData);
   }

   const updatePayment = async (p) => {
      try {
         await axios.put("/payments/" + p._id, p);
         //const newpayments = [...payments, res.data];
         const newpayments = await axios.get("/payments");
         setPayments(newpayments);
      } catch (error) {
         console.error(error);
      }


   };

   const handleEditFormSubmit = (event) => {
      event.preventDefault();

      const editedPayment = {
         _id: editPaymentId,
         createAt: editFormData.createAt.slice(0, 10),
         Firstname: editFormData.Firstname,
         Lastname: editFormData.Lastname,
         Description: editFormData.Description,
         PaymentMethod: editFormData.PaymentMethod,
         Email: editFormData.Email,
         Amount: editFormData.Amount,
         Comment: editFormData.Comment
      }

      const newPayments = [...payments]

      const index = payments.findIndex((payment) => payment._id === editPaymentId);

      newPayments[index] = editedPayment;

      setPayments(newPayments);
      updatePayment(newPayments[index]);
      setEditPaymentId(null);
      window.location.reload();


   }

   const handleEditClick = (event, payment) => {
      event.preventDefault();
      setEditPaymentId(payment._id);

      const formValues = {
         Description: payment.Description,
         PaymentMethod: payment.PaymentMethod,
         Firstname: payment.Firstname,
         Lastname: payment.Lastname,
         Email: payment.Email,
         Amount: payment.Amount,
         Status: "Processing",
         Type: "Outgoing",
         Comment: payment.Comment,
         createAt: payment.createAt
      }

      setEditFormData(formValues);
   }
   const handleCancelClick = (payment, index, handleEditClick) => {
      <ReadOnlyRow payment={payment} index={index} handleEditClick={handleEditClick} />
   }

   return <div className="app-container">
      <Form onSubmit={handleEditFormSubmit}>
         <div>
            <table class="page5">
               <thead>
                  <tr>
                     <th>Date of Payment</th>
                     <th>First Name</th>
                     <th>Last Name</th>
                     <th>Payment Reason</th>
                     <th>Payment Method</th>
                     <th>Email</th>
                     <th>Amount</th>
                     <th>Comments</th>
                  </tr>
               </thead>
               <tbody>
                  {paginatedPosts.map((payment, index) => (
                     <Fragment>
                        {editPaymentId === payment._id ? <EditableRow payment={payment} editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick} /> : <ReadOnlyRow payment={payment} index={index} handleEditClick={handleEditClick} />}
                     </Fragment>
                  ))}
               </tbody>
            </table>
         </div>
      </Form>
      <nav className="d-flex justify content center">
         <ul className="pagination">
            {
               pages.map((page) => (
                  <li className={
                     page === currentPage ? "page-item active" : "page-item"
                  }>
                     <p className="page-link"
                        onClick={() => pagination(page)}
                     >{page}</p></li>
               ))
            }
         </ul>
      </nav>
   </div >;
};

export default Table;
