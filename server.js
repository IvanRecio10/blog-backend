const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const postRoutes = require('./routes/postRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 3000;

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Base de datos conectada correctamente')
    } catch(error) {
        console.log(error)
    }
}

dbConnection()

app.listen(PORT, () => {
    console.log(`Express está escuchando en el puerto :${PORT}`)
})
