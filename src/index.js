const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressHbs = require("express-handlebars");
const path = require("path");
const adminRouter = require("./routers/adminRouter");
const webRouter = require("./routers/webRouter");
const adminAuth = require("./middlewares/adminAuth");
const { validateToken } = require("./services/jwtService");
const { QueryTypes } = require("sequelize");
const ClassDB = require("./config/Db");
let data;

const app = express();

/**
 * Configuring express to use handlebars
 */
const hbs = expressHbs.create({
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "./views/layouts"),
  partialsDir: path.join(__dirname, "./views/partials")
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
// including __dirname cuz the following line gets called when code is running as a process
app.set("views", path.join(__dirname, "./views"));

/**
 * Middleware for reading json data from
 * request body
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", async (req, res) => {
  let data = [];
  await ClassDB.query(
    `
        SELECT project_title, user_name, category_name
FROM (( "public"."Projects"
INNER JOIN "public"."Users" ON "public"."Users".user_id = "public"."Projects".user_id)
LEFT JOIN "public"."Categories" ON "public"."Categories".c_id = "public"."Projects".c_id)
ORDER BY "public"."Projects".project_id DESC;`,
    {
      type: QueryTypes.SELECT
    }
  ).then(response => {
    data = response;
  });
  let isLoggedIn = validateToken(req.cookies.jwt);

  res.render("table", {
    layout: "home",
    pageTitle: "Home",
    isLoggedIn: !!isLoggedIn,
    data
  });
});

app.get("/login", (req, res) => {
  res.render("adminLogin", {
    layout: "home",
    pageTitle: "Admin Login",
    submitTarget: "/admin/login",
    submitMethod: "POST",
    formTitle: "Admin Login Page"
  });
});

app.use("/admin", adminRouter);

app.use("/web", webRouter);

const server = app.listen(8080, () => {
  console.log(`Server running in port ${server.address().port}`);
});
