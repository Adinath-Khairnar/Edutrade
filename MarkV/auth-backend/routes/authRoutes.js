/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// MySQL connection (can separate later)
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Send Email Function
const sendVerificationEmail = async (email, token) => {1
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify your Email',
    html: `<h2>We just need to verify your email address before you can access [EDUTRADE].</h2>
           <a href="http://localhost:3000/api/auth/verify/${token}">Verify your email address</a>`
           // 👆 Corrected the link to hit backend verification API
  };

  await transporter.sendMail(mailOptions);
};

// Register API
router.post('/register', async (req, res) => {
  const { full_name, email, password, phone, location } = req.body;

  if (!full_name || !email || !password) {
    return res.status(400).json({ message: 'Full Name, Email, and Password are required' });
  }

  try {
    const [existingUser] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.promise().query(
      'INSERT INTO users (full_name, email, password, phone, location, created_at, verified) VALUES (?, ?, ?, ?, ?, NOW(), 0)',
      [full_name, email, hashedPassword, phone, location]
    );

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    await sendVerificationEmail(email, token);

    res.status(200).json({ message: 'Registration successful, verification email sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify Email API
router.get('/verify/:token', async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    await db.promise().query('UPDATE users SET verified = 1 WHERE email = ?', [email]);

    // Redirect to login page after successful verification
    return res.redirect('http://localhost:5173/login');
  } catch (err) {
    console.error(err);
    res.status(400).send('Invalid or expired token');
  }
});

// Login API
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and Password are required' });
  }

  try {
    const [userResult] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    if (userResult.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = userResult[0];

    // Check if email is verified
    if (user.verified !== 1) {
      return res.status(400).json({ message: 'Please verify your email first' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT Token for login
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        phone: user.phone,
        location: user.location
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
