const express = require("express");
const app = express();
const path = require("path");
const cookieparser = require("cookie-parser");
const expressSession = require('express-session');
const flash = require('connect-flash');

const db = require("./config/mongoose-connection");

require("dotenv").config();




const ownersRouter = require("./routes/ownersRouter");
const userRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const indexRouter = require("./routes/index");

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieparser());
app.use(
    expressSession({
      resave: false,
      saveUninitialized: false,
      secret: process.env.EXPRESS_SESSION_SECRET,
    })
  );
app.use(flash());
app.use("/owners", ownersRouter);
app.use("/users", userRouter);
app.use("/products", productsRouter);
app.use("/", indexRouter);

app.listen(3000);
