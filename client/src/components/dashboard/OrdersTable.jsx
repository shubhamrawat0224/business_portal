import React from "react";
import "./OrderTable.css";
const orders = [
  {
    user: "Sierra Ferguson",
    comfort: "simple",
    time: "04.12.2021 20:30",
    start: "Furkat Street, Tashkent",
    finish: "Furkat Street, Tashkent",
    income: "50 300 000 SUM",
  },
  // ...more orders
];
const OrdersTable = () => (
  <div className="orders-table">
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Car Comfort</th>
          <th>Ordered Time</th>
          <th>Start Location</th>
          <th>Finish Location</th>
          <th>Income</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((o, i) => (
          <tr key={i}>
            <td>{o.user}</td>
            <td>{o.comfort}</td>
            <td>{o.time}</td>
            <td>{o.start}</td>
            <td>{o.finish}</td>
            <td>{o.income}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
export default OrdersTable;
