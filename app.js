//comment to start repo
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const {requireAuth, checkUser} = require('./middleware/authMiddleware');//can we put them both on the same line?  Yes, I can.

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
//veuwz
app.set('view engine', 'ejs');

//database connector
const DBURI='mongodb+srv://stides:Seventy7@SDEV255.syrfobv.mongodb.net/MO7-CAL';
mongoose.connect(DBURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result)=> app.listen(3000))
    .catch((err)=> console.log(err));

    //rowts
app.get('*', checkUser);
app.get('/', (req, res)=> res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);


/*
//cookie monster cookies
app.get('/set-cookies', (req, res)=>{

//res.setHeader('Set-Cookie', 'newUser=true'); //this is the old way before cookie-parser was installed
res.cookie('newUser', false);
//it is always propertyName, Value, { various options, comma delimited } with cookie-parser
res.cookie('isFaculty', true, { maxAge: 1010 * 60 * 60 *24, secure: true});
//ifFaculty maxAge is how long the cookie will live until it is automatically deleted, secure: true will only load the cookie over 443
//if httpOnly: true it will only pass the cookie value to the browser but won't let you use javaScript on it in the frontend, i.e. it cannot be accessed using document.cookie (cookie is private to the browser and backend, immutible in browser/pages)
//cookies stay with you no matter what page you go to (session based memory allocation of variable space)
//you can see this in the Application tab after hitting CTRL+SHIFT+I
//or you can go to Console and type document.cookie
// and there are more options you can pass in as the third optional
//httpOnly also makes it so the cookies can't be edited on the frontend


res.send('you got the cookies');

});






app.get('/read-cookies', (req, res)=>{

const cookies = req.cookies;
console.log(cookies.newUser);

res.json(cookies);

});
*/