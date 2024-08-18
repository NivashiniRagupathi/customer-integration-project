import React from 'react';
import './index.css'; // Import the CSS file

function CustomerGrid({ customers, pushToCRM }) {
  return (
    <div className="customer-grid">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Phone Number</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Organization</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.phone_number}</td>
              <td>{`${customer.first_name} ${customer.last_name}`}</td>
              <td>{customer.email}</td>
              <td>{customer.address}</td>
              <td>{customer.current_organization}</td>
              <td>
                <button onClick={() => pushToCRM(customer.id)}>Push to CRM</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerGrid;
