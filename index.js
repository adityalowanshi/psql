const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const { connection, sequelize } =require('./postgress');

app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));

const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

const startServer = async () => {
    try {
        await connection();
        app.listen(port, () => console.log(`App listening on port ${port}!`));
    } catch (error) {
        console.error('Failed to start the server:', error);
        process.exit();
    }
};

startServer();