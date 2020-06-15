const express = require("express");
const User = require("../models/User");
const { compareHash } = require("../services/hashingService");
const { createToken } = require("../services/jwtService");

const adminRouter = express.Router();

adminRouter
  .post("/login", (req, res) => {
    const { user_name, password } = req.body;
    console.log(req.body);
    User.findOne({
      where: { user_name }
    })
      .then(result => {
        console.log(result);
        if (!result) {
          res.send("Invalid User");
        } else {
          const { password: passwordHash } = result.get();
          compareHash(password, passwordHash)
            .then(result => {
              console.log(result)
              if (result) {
                const jwtToken = createToken({
                  sub: "admin",
                  user_name
                });
                res.cookie("jwt", jwtToken, { httpOnly: true });
                console.log('redirect')
                res.redirect("/");
              } else {
                res.send("Invalid User");
              }
            })
            .catch(console.error);
        }
      })
      .catch(console.error);
  })
  .get("/logout", (req, res) => {
    res.clearCookie("jwt");
    res.redirect("/login");
  });

module.exports = adminRouter;
