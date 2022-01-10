import React, { useState, useEffect } from 'react';
import './payment.css';
import axios from "axios";
import _ from "lodash";
import { Pagination } from 'react-bootstrap';

const pageSize = 10;
const Table = () => {

   const [payments, setPayments] = useState([]);
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

   const pageCount = payments ? Math.ceil(payments.length / pageSize) : 0;
   if (pageCount === 1) return null;
   const pages = _.range(1, pageCount + 1);

   const pagination = (pageNumber) => {
      setCurrentPage(pageNumber);
      const startIndex = (pageNumber - 1) * pageSize;
      const paginatedPost = _(payments).slice(startIndex).take(pageSize).value();
      setPaginatedPosts(paginatedPost);
   }
   return <div className="app-container">
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
               <tr key={index}>
                  <td>{payment.createAt.slice(0, 10)}</td>
                  <td>{payment.Firstname}</td>
                  <td>{payment.Lastname}</td>
                  <td>{payment.Description}</td>
                  <td>{payment.PaymentMethod}</td>
                  <td>{payment.Email}</td>
                  <td>{'$' + payment.Amount}</td>
                  <td>{payment.Comment}</td>

               </tr>
            ))}
         </tbody>
      </table>
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
