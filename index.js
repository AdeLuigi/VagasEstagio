const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const routes = require('./src/routes/routes')
const app = express();
app.use(cors())
mongoose.connect('mongodb+srv://admin:admin@cluster0.ws0tq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

app.use(express.json())

app.use(routes)

app.listen(3333)