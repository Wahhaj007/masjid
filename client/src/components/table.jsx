import React, { useState, useEffect } from 'react';
import './payment.css';
import axios from "axios";


const Table = () => {

   const [payments, setPayments] = useState([]);
   useEffect(() => {
      const getAllPayments = async () => {
         try {
            const res = await axios.get("/payments");
            setPayments(res.data);
            console.log("refreshed");
         } catch (e) {
            console.log(e);
         }
      };
      getAllPayments();
   }, []);

   return <div className="app-container">
      <table>
         <thead>
            <tr>
               <th>First Name</th>
               <th>Last Name</th>
               <th>Email</th>
               <th>Amount</th>
            </tr>
         </thead>
         <tbody>
            {payments.map((payment) => (
               <tr>
                  <td>{payment.Firstname}</td>
                  <td>{payment.Lastname}</td>
                  <td>{payment.Email}</td>
                  <td>{'$' + payment.Amount}</td>

               </tr>
            ))}
         </tbody>
      </table>

   </div>;
};

export default Table;
