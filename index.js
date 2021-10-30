require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const router = require('./routes/index');

const PORT = process.env.PORT || 5000 ;
const app = express();

app.use(cors());
app.use(express.json())
app.use('/api', router)

// checking
// app.get('/api', (req, res) => {
//     res.status(200).json({message: 'api Its a live!'})
// })

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Connection has been established successfully.')
        app.listen(PORT, () => console.log(`Server start at port ${PORT}`));

    } catch (e) {
        console.error('Unable to connect to the database:', error);
    }
}

start();



