import express from 'express';
import bodyParser from 'body-parser';

import client from './configs/conn.js';
import userRoutes from './routes/users.js';

const app = express();
const PORT = process.env.PORT || 5000;

const localhost = `http://localhost:${PORT}`;

app.use(bodyParser.json());

app.use('/users', userRoutes);

app.get('/', (req, res) => {

});

app.listen (PORT, () => {
    console.log(`Server running on port: ${PORT}`);
    console.log(`${localhost}`);
});
