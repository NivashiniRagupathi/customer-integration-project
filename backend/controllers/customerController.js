const db = require('../db/database');
const { v4: uuidv4 } = require('uuid');

// Add a new customer
const addCustomer = (req, res) => {
    const { phoneNumber, firstName, lastName, email, address, currentOrganization } = req.body;
    
    // Generate a UUID
    const id = uuidv4();

    const query = `
        INSERT INTO customer_info (id, phone_number, first_name, last_name, email, address, current_organization)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(query, [id, phoneNumber, firstName, lastName, email, address, currentOrganization], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Failed to add customer' });
        }

        res.status(201).json({ id });
    });
};

// Get all customers
const getCustomers = (req, res) => {
    const query = `SELECT * FROM customer_info`;

    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve customers' });
        }

        res.status(200).json(rows);
    });
};

module.exports = { addCustomer, getCustomers };
