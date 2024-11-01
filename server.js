const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Konfigurasi Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Misalnya, menggunakan Gmail
    auth: {
        user: 'your-email@gmail.com', // Ganti dengan email Anda
        pass: 'your-email-password' // Ganti dengan password email Anda
    }
});

// Endpoint untuk registrasi
app.post('/register', (req, res) => {
    const { username, email } = req.body;

    // Kirim email verifikasi
    const mailOptions = {
        from: 'your-email@gmail.com', // Ganti dengan email Anda
        to: email,
        subject: 'Verifikasi Email',
        text: `Halo ${username}, silakan klik tautan berikut untuk memverifikasi email Anda: http://localhost:${port}/verify?email=${email}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
        res.send('Registrasi berhasil! Silakan cek email Anda untuk verifikasi.');
    });
});

// Endpoint untuk verifikasi
app.get('/verify', (req, res) => {
    const email = req.query.email;
    // Di sini Anda dapat menandai email sebagai terverifikasi di database Anda
    res.send(`Email ${email} berhasil diverifikasi!`);
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
