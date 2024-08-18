const axios = require('axios');
const db = require('../db/database');
const accessToken = '1000.ffe0a252cfad5d9731b059da1b92780b.b81e487e1adcadb8cd088e183279dd94'; // Replace with your actual access token

// Push customer data to Zoho CRM
const pushToCRM = (req, res) => {
    const { customerId } = req.body;

    const query = `SELECT * FROM customer_info WHERE id = ?`;

    db.get(query, [customerId], async (err, customer) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve customer data' });
        }

        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        try {
            const crmApiUrl = 'https://www.zohoapis.com/crm/v2/Leads';

            const data = {
                data: [{
                    Last_Name: customer.last_name,
                    First_Name: customer.first_name,
                    Email: customer.email,
                    Company: customer.current_organization,
                    Phone: customer.phone_number,
                    Address: customer.address
                }],
                trigger: ['approval', 'workflow', 'blueprint']
            };

            const response = await axios.post(crmApiUrl, data, {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            res.status(200).json({ message: 'Customer data pushed to CRM successfully' });
        } catch (error) {
            console.error('Error pushing data to CRM:', error.response ? error.response.data : error.message);
            res.status(500).json({ error: 'Failed to push data to CRM' });
        }
    });
};

module.exports = { pushToCRM };
