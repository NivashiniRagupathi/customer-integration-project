const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const customerRoutes = require('./routes/customerRoutes');
const crmRoutes = require('./routes/crmRoutes');
const db = require('./db/database.js');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/customers', customerRoutes);
app.use('/api/push-to-crm', crmRoutes);

app.delete('/api/customers/:id', async (req, res) => {
const { id } = req.params;

try {
    // Assuming you're using SQLite or another database
    const result = await db.run('DELETE FROM customer_info WHERE id = ?', [id]);

    if (result.changes === 0) {
    return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json({ message: 'Customer deleted successfully' });
} catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ message: 'Internal Server Error' });
}
});

module.exports = app;
