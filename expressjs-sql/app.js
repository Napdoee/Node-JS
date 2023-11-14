const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors())

const categoryRoutes = require('./routes/categories');
app.use('/api/v1/categories', categoryRoutes);
const authRouter = require('./routes/authRouter');
app.use('/api/v1/auth', authRouter);

app.listen(port, () => console.log(`Server listening to port ${port}`))