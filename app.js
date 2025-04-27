const express = require('express');
const app = express();
const path = require('path');
const cookieparser = require('cookie-parser');
const db = require('./config/mongoose-connection');
const ownersRouter = require('./routes/ownersRouter');
const userRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');

app.set( "view engine", "ejs" );
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieparser());

app.use("/owners", ownersRouter);
app.use("/users", userRouter);
app.use("/products", productsRouter);

app.listen(3000);