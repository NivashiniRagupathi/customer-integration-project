import React, { useState } from 'react';
import './index.css'; // Import the CSS file

function CustomerForm({ addCustomer }) {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    currentOrganization: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCustomer(formData);
    setFormData({
      phoneNumber: '',
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      currentOrganization: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="customer-form">
      <input
        type="text"
        name="phoneNumber"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="currentOrganization"
        placeholder="Current Organization"
        value={formData.currentOrganization}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default CustomerForm;
