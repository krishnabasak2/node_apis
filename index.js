require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes/ProductRoutes');
const UserRouter = require('./routes/UserRoutes');
const noteRouter = require('./routes/NoteRoutes');
const database = require('./database');
const cors = require('cors');
database();

app.use(cors());
app.use(express.json());
app.use('/api/product', router);
app.use('/api/user', UserRouter);
app.use('/api/note', noteRouter);

app.listen(process.env.PORT, () => {
    console.log('server started');
})