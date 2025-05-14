const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getDb } = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET; 

const registerUser = async (data) => {
  const db = getDb();

  const hashedPassword = await bcrypt.hash(data.password, 10); 

  const result = await db
    .command(
      `INSERT INTO UserAccount CONTENT {
        fullName: :fullName,
        email: :email,
        password: :password,
        role: :role
      }`,
      {
        params: {
          fullName: data.fullName,
          email: data.email,
          password: hashedPassword, // Use hashed password
          role: data.role || 'doctor',
        },
      }
    )
    .all();

  return result[0];
};

const loginUser = async (data) => {
  const db = getDb();

  const result = await db
    .query('SELECT FROM UserAccount WHERE email = :email', {
      params: { email: data.email },
    })
    .all();

  const user = result[0];

  if (!user) {
    throw new Error('User not found'); // Prevents crash when user is missing
  }

  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ userId: user['@rid'], role: user.role }, JWT_SECRET, {
    expiresIn: '1h',
  });

  return { token };
};


module.exports = { registerUser, loginUser };
