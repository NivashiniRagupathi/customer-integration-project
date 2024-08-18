const axios = require('axios');
const db = require('../db/database');
const refreshToken = '1000.6376d3fcefb914778d6fb3221567be24.3f0e1caa3ba9b3e94364a755760255f1'; // Replace with your actual refresh token

// Function to get a new access token using the refresh token
const getAccessToken = async (refreshToken) => {
    try {
        const response = await axios.post('https://accounts.zoho.com/oauth/v2/token', null, {
            params: {
                refresh_token: refreshToken,
                grant_type: 'refresh_token',
                client_id: '1000.PT10VLB4C0J18K90TTCBKCX4MI0XQC', // Replace with your actual client ID
                client_secret: 'ba5089b462aedf5e4139fd2ec69a84a7001b34461f' // Replace with your actual client secret
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error getting access token:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Push customer data to Zoho CRM
const pushToCRM = async (req, res) => {
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
            // Get a new access token using the refresh token
            const accessToken = await getAccessToken(refreshToken);

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
