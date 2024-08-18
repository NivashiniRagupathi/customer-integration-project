import React, { useState, useEffect } from 'react';
import CustomerForm from './components/CustomerForm';
import CustomerGrid from './components/CustomerGrid';
import axios from 'axios';
import './App.css'; // Import the CSS file for styling

function App() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const response = await axios.get('http://localhost:5000/api/customers');
    setCustomers(response.data);
  };

  const addCustomer = async (customerData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/customers', customerData);
      console.log('Customer added successfully:', response.data);
      fetchCustomers(); // Refresh customer list after adding
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };
  
  const pushToCRM = async (customerId) => {
    try {
      const response = await axios.post('http://localhost:5000/api/push-to-crm', { customerId });
      console.log('CRM Push Response:', response.data);
      alert('Customer data pushed to CRM successfully!');
    } catch (error) {
      console.error('Error pushing to CRM:', error);
      alert('Failed to push data to CRM.');
    }
  };

  return (
    <div className="App">
      <h1 className='heading-crm'>Customer CRM</h1>
      <CustomerForm addCustomer={addCustomer} />
      <CustomerGrid customers={customers} pushToCRM={pushToCRM} />
    </div>
  );
}

export default App;
