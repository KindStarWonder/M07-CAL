//comment to start repo
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.static('public'));
app.use(express.json());
//veuwz
app.set('view engine', 'ejs');

//database connector
const DBURI='mongodb+srv://stides:Seventy7@SDEV255.syrfobv.mongodb.net/MO7-CAL';
mongoose.connect(DBURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result)=> app.listen(3000))
    .catch((err)=> console.log(err));

    //rowts
app.get('/', (req, res)=> res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);