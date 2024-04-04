const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

app.post('/api/send-email', async (req, res) => {
    const { selectedRows } = req.body;

    try {
        // Logic to fetch employee data based on selectedRows
        // This could be querying your database to get employee details based on the IDs

        // Logic to send email using nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-password'
            }
        });

        const mailOptions = {
            from: 'your-email@gmail.com',
            to: 'info@redpositive.in',
            subject: 'Employee Data',
            text: 'Here is the data of selected employees...',
            // You can include the data of selected employees in the email body
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
