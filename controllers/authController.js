const userModel = require("../models/user-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generatetoken");
const flash = require("connect-flash");

module.exports.regiserUser = async (req, res) => {
  //problems: Agar frontend se user ne koi field miss kar di toh bhi mongo db schema less hone ke karran user bana dega toh humein ek joy based full check lagana hai jisse hum is case ko prevent kar sake
  try {
    let { email, password, fullname } = req.body;

    let user = await userModel.findOne({ email: email });
    if (user)
    {
      req.flash("error", "You already have an account. Please Login");
      res.redirect("/");
    }
    // problem 2 agar hum let {email, password} = req.body; iss tarah fullname dena bhul gaye toh server crash kar jayega toh uske liye ek check bhi lagana hai

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.send(err.message);
        else {
          let user = await userModel.create({
            email,
            password: hash,
            fullname,
          });

          let token = generateToken(user);
          res.cookie("token", token);
          res.redirect("/");
        }
      });
    });
  } catch (err) {
    res.send(err.message);
  }
};

module.exports.loginUser = async (req, res) => {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email: email });
  if (!user) {
    req.flash("error", "Email or password incorrect");
    return res.redirect("/");
  } 
  
  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      let token = generateToken(user);
      res.cookie("token", token);
      res.redirect("/shop");
    } else {
      req.flash("error", "Email or password incorrect");
      res.redirect('/');
    }
  });
};

module.exports.logout = (req ,res ) => {
  res.cookie("token", "");
  res.redirect("/");
}
